import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { apiReference } from "@scalar/nestjs-api-reference"

class Main {
  private APP_PORT = process.env.APP_PORT || 3000
  private GLOBAL_PREFIX = "api"

  async bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Do stuff...
    app.enableVersioning()
    app.setGlobalPrefix(this.GLOBAL_PREFIX)
    this.setupValidation(app)
    this.enableCors(app)
    this.setupDocs(app)

    await app.listen(this.APP_PORT)

    this.showUrls()
  }

  private setupValidation(app: INestApplication) {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
  }

  private enableCors(app: INestApplication) {
    app.enableCors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  }

  private showUrls() {
    console.log("App running:")
    console.log(
      `  - Server:  http://localhost:${this.APP_PORT}/${this.GLOBAL_PREFIX}`,
    )
    console.log(`  - Scalar:  http://localhost:${this.APP_PORT}/docs/scalar`)
  }

  private setupDocs(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle("App API")
      .addServer(`http://localhost:${this.APP_PORT}`)
      .setVersion("1.0")
      // .addBearerAuth(
      //   {
      //     type: "http",
      //     scheme: "bearer",
      //     bearerFormat: "JWT",
      //     name: "JWT",
      //     description: "Enter JWT token",
      //     in: "header",
      //   },
      //   "bearer", // 🔑 This name matches @ApiBearerAuth() in controller
      // )
      .build()

    const doc = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("docs/swagger", app, doc, {
      jsonDocumentUrl: "docs/json",
      yamlDocumentUrl: "docs/yaml",
    })

    app.use(
      "/docs/scalar",
      apiReference({
        content: doc,
        // authentication: {
        //   preferredSecurityScheme: "bearer",
        // },
        theme: "default",
        layout: "classic",
        defaultHttpClient: {
          targetKey: "js",
          clientKey: "fetch",
        },
      }),
    )
  }
}

new Main().bootstrap()
