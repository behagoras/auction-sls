const MailQueueIAM = {
  Effect: 'Allow',
  Action: [
    'sqs:SendMessage',
  ],
  Resource: [
    '${self:custom.MainQueue.arn}'
  ]
};

export default MailQueueIAM;