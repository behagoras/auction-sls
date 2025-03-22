import type { AWS } from '@serverless/typescript'

export type CloudFormationResource = NonNullable<AWS['resources']>['Resources'][string];