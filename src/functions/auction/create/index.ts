import { handlerPath } from '@libs/handler-resolver';
import { auth0Authorizer } from '@constants';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'auction',
        authorizer: auth0Authorizer
      },
    },
  ],
};