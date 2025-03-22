
import { default as AuctionsTableIam } from './AuctionsTableIam';
import { default as MailQueueIAM } from './MailQueueIAM';
import { default as AuctionsBucketIAM } from './AuctionsBucketIAM';

const iamRoleStatements = [
  AuctionsTableIam,
  MailQueueIAM,
  AuctionsBucketIAM,
]

export { AuctionsTableIam, MailQueueIAM, AuctionsBucketIAM };

export default iamRoleStatements;