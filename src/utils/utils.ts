import { Auction, AUCTION_STATUS } from '@types';
import { v4 as uuid } from 'uuid';

interface CreateAuctionParams {
  title: string;
  seller: string;
  createdDate?: Date;
  endingAt?: Date;
}

export function createNewAuctionItem({
  title,
  seller,
  createdDate = new Date(),
  endingAt,
}: CreateAuctionParams): Auction {
  const endDate = endingAt || new Date(createdDate.getTime() + 60 * 60 * 1000);
  return {
    id: uuid(),
    title,
    status: AUCTION_STATUS.OPEN,
    createdAt: createdDate.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0,
      bidder: null
    },
    seller,
  };
}

export function formatAuctionFromDynamo(item: any): Auction {
  return {
    id: item.id?.S ?? '',
    title: item.title?.S ?? '',
    status: (item.status?.S ?? 'OPEN') as AUCTION_STATUS,
    createdAt: item.createdAt?.S ?? '',
    endingAt: item.endingAt?.S ?? '',
    highestBid: {
      amount: item.highestBid?.amount ?? 0,
      bidder: item.highestBid?.bidder ?? null
    },
    seller: item.seller?.S ?? '',
  };
}