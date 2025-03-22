import { default as createAuction } from './create'
import { default as getAuctions } from './getAll'
import { default as getAuction } from './getAuction'
import { default as placeBid } from './bid'
import { default as processAuctions } from './processAuctions'
import { default as uploadAuctionPicture } from './uploadAuctionPicture';

const auctionFunctions = {
  createAuction,
  getAuctions,
  getAuction,
  placeBid,
  processAuctions,
  uploadAuctionPicture,
}

export default auctionFunctions;