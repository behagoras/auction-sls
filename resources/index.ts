import { default as AuctionsTableResource } from './AuctionsTable';
import { AuctionsBucket, AuctionsBucketPolicy } from './AuctionsBucket';

const resources = {
  AuctionsTable: AuctionsTableResource,
  AuctionsBucket,
  AuctionsBucketPolicy,
};

export default resources;
