import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import * as path from "path"
import * as uuid from "uuid"
import { InjectRepository } from "@nestjs/typeorm"
import { Upload } from "./upload.entity"
import { Repository } from "typeorm"

if (!process.env.LIARA_ENDPOINT)
  throw new Error(
    "Missing Liara endpoint configuration in environment variables.",
  )
if (!process.env.LIARA_BUCKET_NAME)
  throw new Error(
    "Missing Liara bucket name configuration in environment variables.",
  )
if (!process.env.LIARA_ACCESS_KEY)
  throw new Error(
    "Missing Liara access key configuration in environment variables.",
  )
if (!process.env.LIARA_SECRET_KEY)
  throw new Error(
    "Missing Liara secret key configuration in environment variables.",
  )

const s3 = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT as string,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY as string,
    secretAccessKey: process.env.LIARA_SECRET_KEY as string,
  },
})

@Injectable()
export class UploadsService {
  private readonly folderName = "pathz"

  constructor(
    @InjectRepository(Upload)
    private readonly uploadsRepo: Repository<Upload>,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const fileId = await this.uploadToLiaraObjectStorage(file)

    const newUpload = await this.saveInDb(file, fileId)

    return newUpload
  }

  private async uploadToLiaraObjectStorage(file: Express.Multer.File) {
    if (!file) throw new InternalServerErrorException("No file provided")

    const fileExt = path.extname(file.originalname)
    const fileId = uuid.v4()
    const uniqueKey = `${this.folderName}/${fileId}-${fileExt}`

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.LIARA_BUCKET_NAME as string,
      Key: uniqueKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    try {
      await s3.send(putObjectCommand)
    } catch (error) {
      console.error("❌ Upload error:", error)
      throw new InternalServerErrorException("File upload failed.")
    }

    return fileId
  }

  private async saveInDb(file: Express.Multer.File, fileId: string) {
    const extension = path.extname(file.originalname)

    let newUpload = this.uploadsRepo.create({
      extension,
      fileId,
      mime: file.mimetype,
      size: file.size,
    })

    newUpload = await this.uploadsRepo.save(newUpload)

    return newUpload
  }
}
