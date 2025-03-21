import type { AWS } from '@serverless/typescript';

import { AuctionsTableIam, MailQueueIAM } from './iam';
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
      MAIL_QUEUE_URL: '${self:custom.MailQueue.url}',
      MAIL_QUEUE_ARN: '${self:custom.MailQueue.arn}',
    },
    iam: {
      role: {
        statements: [
          AuctionsTableIam,
          MailQueueIAM,
        ]
      },
    },
  },
  resources: {
    Resources: {
      AuctionsTable: AuctionsTableResource
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
    MailQueue: {
      arn: {
        "Fn::Sub": "arn:aws:sqs:${AWS::Region}:${AWS::AccountId}:notifications-service-${self:provider.stage}-mail-queue"
      },
      url: {
        "Fn::Sub": "https://sqs.${AWS::Region}.amazonaws.com/${AWS::AccountId}/notifications-service-${self:provider.stage}-mail-queue"
      }
    },
  },
};

module.exports = serverlessConfiguration;
