import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'auction/{id}',
        // Every user can access the getAuction endpoint
        // authorizer: {
        //   name: 'auth0Authorizer',
        //   arn: {
        //     'Fn::ImportValue': 'api-authorizer-${self:provider.stage}-AuthorizerLambdaFunctionArn',
        //   },
        //   identitySource: 'method.request.header.Authorization',
        //   resultTtlInSeconds: 0
        // }
      },
    },
  ],
};