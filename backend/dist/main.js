"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
// async function bootstrap() {
//   // Create the NestJS application instance with bufferLogs option enabled
//   const app = await NestFactory.create(AppModule, {
//     bufferLogs: true,
//   });
//   // Get the configuration service instance from the application
//   const configService = app.get(ConfigService);
//   // Enable URI versioning with default version '1'
//   app.enableVersioning({
//     type: VersioningType.URI,
//     defaultVersion: "1",
//   });
//   // Middleware setup
//   app.use(cookieParser());
//   app.use(helmet());
//   app.use(compression());
//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//       whitelist: true,
//       forbidNonWhitelisted: true,
//     })
//   );
//   app.enableCors({
//     origin: true,
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     credentials: true,
//   });
//   // Get port from config with a default value
//   const port = configService.get<number>("app.APP_PORT", 8080);
//   // Start the application
//   await app.listen(3000);
// }
// // Bootstrap the application
// bootstrap();
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    await app.listen(8080);
}
bootstrap();

//# sourceMappingURL=main.js.map