import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client with proper configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-west-2',
});

export default async function uploadPictureToS3(key: string, body: Buffer) {
  const command = new PutObjectCommand({
    Bucket: process.env.AUCTIONS_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  });

  const s3Response = await  s3.send(command);
  console.log("🚀 ~ uploadPictureToS3 ~ s3Response:", s3Response)

  return {
    url: `https://${process.env.AUCTIONS_BUCKET_NAME}.s3.amazonaws.com/${key}`,
    s3Response,
  };
}
