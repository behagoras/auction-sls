import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client with proper configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-west-2',
});

export default async function uploadPictureToS3(key: string, base64: string) {
  let buffer;
  
  if (base64.startsWith('data:image')) {
    const base64Data = base64.split(';base64,').pop();
    buffer = Buffer.from(base64Data, 'base64');
  } else {
    buffer = Buffer.from(base64, 'base64');
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AUCTIONS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: 'image/jpeg',
  });

  const s3Response = await s3.send(command);
  const url = `https://${process.env.AUCTIONS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  
  return { url, s3Response };
}
