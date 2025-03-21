
import { default as AuctionsTableIam } from './AuctionsTableIam';
import { default as MailQueueIAM } from './MailQueueIAM';

const iam = [
  AuctionsTableIam,
  MailQueueIAM,
]
export { AuctionsTableIam, MailQueueIAM };

export default iam;