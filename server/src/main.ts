import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { apiReference } from "@scalar/nestjs-api-reference"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Swagger & Scalar config
  const docsConfig = new DocumentBuilder()
    .setTitle("PathZ app API")
    .setDescription("This is the backend API of the 'PathZ' app.")
    .addServer("http://localhost:3002/api")
    .setVersion("1.0")
    .build()
  const doc = SwaggerModule.createDocument(app, docsConfig)

  SwaggerModule.setup("docs/swagger", app, doc, {
    jsonDocumentUrl: "docs/swagger/json",
  })

  app.use(
    "/docs/reference",
    apiReference({
      content: doc,
      theme: "deepSpace",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  )

  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT ?? 3002)
}
bootstrap()
