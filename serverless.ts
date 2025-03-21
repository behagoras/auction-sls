import type { AWS } from '@serverless/typescript';

import { AuctionsTableIam } from './iam';
import { AuctionsTableResource } from './resources';

import { auctionFunctions } from '@functions';

const serverlessConfiguration: AWS = {
  service: 'auction',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    profile: 'psychologist', // aws profile:
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'us-west-2',
    memorySize: 256,
    stage: '${opt:stage, "dev"}',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      AUCTION_TABLE_NAME: '${self:custom.AuctionsTable.tableName}',
      MAIL_QUEUE_URL: '${self:custom.MainQueue.url}',
      MAIL_QUEUE_ARN: '${self:custom.MainQueue.arn}',
    },
    iam: {
      role: {
        statements: [
          AuctionsTableIam,
        ]
      },
    },
  },
  resources: {
    Resources: {
      AuctionsTable: AuctionsTableResource,
    }
  },
  configValidationMode: 'error',
  functions: {
    ...auctionFunctions,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      platform: 'node',
      concurrency: 10,

      external: [
        '@aws-sdk/client-dynamodb',
        '@aws-sdk/lib-dynamodb',
      ],
    },
    bundle: {
      linting: false,
    },
    AuctionsTable: {
      tableName: "AuctionsTable-${self:provider.stage}",
      arn: {
        "Fn::Sub": `arn:aws:dynamodb:\${AWS::Region}:\${AWS::AccountId}:table/\${self:custom.AuctionsTable.tableName}`,
      },
    },
    MainQueue: {
      arn: 'cf:notifications-service-${self:provider.stage}.MailQueueArn',
      url: 'cf:notifications-service-${self:provider.stage}.MailQueueUrl',
    },
  },
};

module.exports = serverlessConfiguration;
