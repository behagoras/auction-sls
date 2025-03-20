export const auth0Authorizer = {
  name: 'auth0Authorizer',
  arn: {
    'Fn::ImportValue': 'api-authorizer-${self:provider.stage}-AuthorizerLambdaFunctionArn',
  },
  identitySource: 'method.request.header.Authorization',
  resultTtlInSeconds: 0
}; 