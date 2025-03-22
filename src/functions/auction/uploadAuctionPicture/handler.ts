

import validator from "@middy/validator";
import { APIGatewayProxyResult } from 'aws-lambda';

import { commonMiddleware } from '@utils';

import { placeBidInputSchema } from '../bid/schemas';

export const uploadAuctionPicture = async (
  event,
  context,
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: 'Hello, world!',
      auctionsBucketName: process.env.AUCTIONS_BUCKET_NAME,
     }),
  };
};

export const main = commonMiddleware(uploadAuctionPicture)
.use(
  validator({
    inputSchema: placeBidInputSchema,
    ajvOptions: {
      strict: false,
      useDefaults: true,
    }
  })
);