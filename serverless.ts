import type { AWS } from '@serverless/typescript';

import { auctionFunctions } from '@functions';
import iamRoleStatements from '@iam';
import resources from '@resources';

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
      AUCTIONS_BUCKET_NAME: '${self:custom.AuctionsBucket.name}',
    },
    iam: {
      role: {
        statements: iamRoleStatements
      },
    },
    apiGateway: {
      binaryMediaTypes: ['image/jpeg', 'image/png', 'image/*', 'multipart/form-data'],
    },
  },
  resources: {
    Resources: {
      ...resources,
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
        '@aws-sdk/client-s3',
        '@aws-sdk/client-sqs',
        '@aws-sdk/middleware-sdk-s3',
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
    AuctionsBucket: {
      name: "auctions-ferocity-bucket-${self:provider.stage}",
      arn: {
        "Fn::Sub": "arn:aws:s3:::${self:custom.AuctionsBucket.name}"
      }
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
