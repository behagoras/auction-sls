const AuctionsBucketIAM = {
  Effect: 'Allow',
  Action: [
    's3:PutObject',
    's3:GetObject',
  ],
  Resource: 'arn:aws:s3:::${self:custom.AuctionsBucket.name}/*',
};

export default AuctionsBucketIAM;