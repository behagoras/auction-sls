import { handlerPath } from '@libs/handler-resolver';
import { auth0Authorizer } from '@constants';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'PATCH',
        path: 'auction/{id}/bid',
        authorizer: auth0Authorizer
      },
    },
  ],
};