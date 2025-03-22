import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

import {
  SQSClient,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";

const sqsClient = new SQSClient();

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


const notify = async ({
  subject, recipient, body,
}: {
  subject: string;
  recipient: string;
  body: string;
}) => {
  console.log("🚀 ~ process.env.MAIL_QUEUE_URL:", process.env.MAIL_QUEUE_URL)
  const command = new SendMessageCommand({
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
      subject,
      recipient,
      body,
    }),
  });
  return sqsClient.send(command);
};

export default async function closeAuction(auction) {
  const params = {
    TableName: process.env.AUCTION_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  const command = new UpdateCommand(params);
  await docClient.send(command);

  const { title, seller, highestBid } = auction;
  const { amount, bidder } = highestBid;

  // Only send notifications if there's a valid bidder
  if (!bidder) {
    console.log(`No bidder for auction ${auction.id}, skipping notifications`);
    return [];
  }

  if (amount === 0) {
    console.log(`No bid amount for auction ${auction.id}, notifying bidder`);
    return notify({
      subject: `Auction ${title} closed with no bids`,
      recipient: bidder,
      body: `Oh no! The auction ${title} closed with no bids. Better luck next time!`,
    });
  }

  console.log(`Sending notifications for auction ${auction.id} to bidder ${bidder} and seller ${seller}`);

  const notifyBidder = notify({
    subject: `You won an auction!`,
    recipient: bidder,
    body: `You won an auction for ${title} with a bid of $${amount}`,
  });

  const notifySeller = notify({
    subject: `You sold an auction!`,
    recipient: seller,
    body: `You sold an auction for ${title} with a bid of $${amount}`,
  });

  const responses = await Promise.all([notifyBidder, notifySeller]);
  console.log('Responses from SQS: ', responses);

  return responses;
}
