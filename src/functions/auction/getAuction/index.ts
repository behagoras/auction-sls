import { handlerPath } from '@libs/handler-resolver';
// import { auth0Authorizer } from '@constants';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'auction/{id}',
        // Every user can access the getAuction endpoint
        // authorizer: auth0Authorizer
      },
    },
  ],
};