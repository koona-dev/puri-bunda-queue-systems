import { ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  // Create the NestJS application instance with bufferLogs option enabled
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Get the configuration service instance from the application
  const configService = app.get(ConfigService);

  // Enable URI versioning with default version '1'
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  // Middleware setup
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.enableCors({
    origin: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // Set up Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Puri Bunda Entry API Documentation")
    .setDescription(
      "This is the API documentation for Puri Bunda Entry to help you get started with the API."
    )
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, document);

  // Get port from config with a default value
  const port = configService.get<number>("app.APP_PORT", 8080);

  // Start the application
  await app.listen(port);
}

// Bootstrap the application
bootstrap();
