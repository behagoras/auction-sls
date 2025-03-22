import validator from "@middy/validator";
import { APIGatewayProxyResult } from 'aws-lambda';

import { commonMiddleware } from '@utils';
import { getAuctionById } from "../getAuction/handler";

import { uploadPictureInputSchema } from './schemas';
import uploadPictureToS3 from "./uploadPictureToS3";

export const uploadAuctionPicture = async (
  event,
  context,
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;
  const auction = await getAuctionById(id);

  const base64 = event.body;

  const s3 = await uploadPictureToS3(`auctions/${auction.id}.jpg`, base64);
  
  console.log(s3);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Picture uploaded successfully',
      s3,
      auction,
    }),
  };
};

export const main = commonMiddleware(uploadAuctionPicture)
  .use(
    validator({
      eventSchema: uploadPictureInputSchema,
      ajvOptions: {
        strict: false,
        useDefaults: true,
      }
    })
  );