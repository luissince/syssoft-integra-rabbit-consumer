// src/config/s3.ts
import { S3Client } from "@aws-sdk/client-s3";

class S3Singleton {
  private static instance: S3Client | null = null;

  public static getInstance(): S3Client {
    if (!S3Singleton.instance) {
      S3Singleton.instance = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });
    }
    return S3Singleton.instance;
  }
}

export default S3Singleton;
