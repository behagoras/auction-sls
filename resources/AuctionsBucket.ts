import type { CloudFormationResource } from './types';

export const AuctionsBucket: CloudFormationResource = {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: '${self:custom.AuctionsBucket.name}',
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: false,
      BlockPublicPolicy: false,
      IgnorePublicAcls: false,
      RestrictPublicBuckets: false
    },
    LifecycleConfiguration: {
      Rules: [
        {
          Id: 'ExpirePictures',
          Status: 'Enabled',
          ExpirationInDays: 1,
        }
      ]
    },
    OwnershipControls: {
      Rules: [
        {
          ObjectOwnership: 'ObjectWriter'
        }
      ]
    },
    CorsConfiguration: {
      CorsRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
          AllowedOrigins: ['*'],
          MaxAge: 3000
        }
      ]
    }
  }
}

export const AuctionsBucketPolicy: CloudFormationResource = {
  Type: 'AWS::S3::BucketPolicy',
  Properties: {
    Bucket: { Ref: 'AuctionsBucket' },
    PolicyDocument: {
      Statement: [
        {
          Sid: 'PublicRead',
          Effect: 'Allow',
          Principal: '*',
          Action: [
            's3:GetObject'
          ],
          Resource: 'arn:aws:s3:::${self:custom.AuctionsBucket.name}/*'
        }
      ]
    }
  }
}

// The public bucket policy has been removed because:
// 1. AWS S3 Block Public Access settings are preventing public policies
// 2. Best security practice is to use pre-signed URLs for controlled access
// 3. Instead of making bucket objects public, implement pre-signed URLs in your Lambda functions