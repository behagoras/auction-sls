import { handlerPath } from '@libs/handler-resolver';
// import { auth0Authorizer } from '@constants';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'auctions',
        // Every user can access the getAllAuctions endpoint
        // authorizer: auth0Authorizer
      },
    },
  ],
};