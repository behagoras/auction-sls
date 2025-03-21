const MailQueueIAM = {
  Effect: 'Allow',
  Action: [
    'sqs:SendMessage',
  ],
  Resource: '${self:custom.MailQueue.arn}'
};

export default MailQueueIAM;