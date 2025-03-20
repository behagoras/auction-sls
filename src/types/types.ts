import { APIGatewayProxyEvent } from "aws-lambda";

export interface Auth0Authorizer {
  scope: string;
  name: string;
  principalId: string;
  userId: string;
  email?: string;
  [key: string]: any; // For any additional fields
}

export interface APIGatewayRequestContext extends Omit<APIGatewayProxyEvent['requestContext'], 'authorizer'> {
  authorizer: Auth0Authorizer;
}

export type APIGatewayTypedEvent<T={}, P = {}> = Omit<APIGatewayProxyEvent, "body" | "requestContext"> & { 
  body: T;
  pathParameters: P;
  requestContext: APIGatewayRequestContext;
};

export enum AUCTION_STATUS {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export type Auction = {
  id: string;
  title: string;
  status: AUCTION_STATUS;
  createdAt: string;
  endingAt: string;
  highestBid: {
    amount: number;
    bidder: string | null;
  };
  seller: string;
};