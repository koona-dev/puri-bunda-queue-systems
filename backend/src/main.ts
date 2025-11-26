import { ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { AppModule } from "./app.module";

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

  // Get port from config with a default value
  const port = configService.get<number>("app.APP_PORT", 8080);

  // Start the application
  await app.listen(port);
}

// Bootstrap the application
bootstrap();
