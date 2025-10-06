import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import * as path from 'path'

@Injectable()
export class UploadsService {
  private readonly s3: S3Client

  constructor() {
    // ✅ Make sure env vars exist
    if (!process.env.LIARA_ENDPOINT || !process.env.LIARA_BUCKET_NAME) {
      throw new Error('Missing Liara configuration in environment variables.')
    }

    this.s3 = new S3Client({
      region: 'default', // Liara doesn’t require a real region
      endpoint: process.env.LIARA_ENDPOINT,
      forcePathStyle: true, // 👈 important for Liara (and most S3-compatible providers)
      credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY!,
        secretAccessKey: process.env.LIARA_SECRET_KEY!,
      },
    })
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new InternalServerErrorException('No file provided')

    const uniqueKey = `${Date.now()}-${path.basename(file.originalname)}`

    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: uniqueKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    }

    try {
      await this.s3.send(new PutObjectCommand(params))

      // ✅ Construct correct Liara public URL
      const endpoint = process.env.LIARA_ENDPOINT!.replace(/\/$/, '')
      const bucket = process.env.LIARA_BUCKET_NAME!
      const fileUrl = `${endpoint}/${bucket}/${uniqueKey}`

      return { success: true, url: fileUrl }
    } catch (error) {
      console.error('❌ Upload error:', error)
      throw new InternalServerErrorException('File upload failed.')
    }
  }
}
