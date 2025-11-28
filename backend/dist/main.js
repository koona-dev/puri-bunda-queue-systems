"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _core = require("@nestjs/core");
const _compression = /*#__PURE__*/ _interop_require_default(require("compression"));
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _helmet = /*#__PURE__*/ _interop_require_default(require("helmet"));
const _appmodule = require("./app.module");
const _swagger = require("@nestjs/swagger");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function bootstrap() {
    // Create the NestJS application instance with bufferLogs option enabled
    const app = await _core.NestFactory.create(_appmodule.AppModule, {
        bufferLogs: true
    });
    // Get the configuration service instance from the application
    const configService = app.get(_config.ConfigService);
    // Enable URI versioning with default version '1'
    app.enableVersioning({
        type: _common.VersioningType.URI,
        defaultVersion: "1"
    });
    // Middleware setup
    app.use((0, _cookieparser.default)());
    app.use((0, _helmet.default)());
    app.use((0, _compression.default)());
    app.useGlobalPipes(new _common.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    app.enableCors({
        origin: true,
        methods: [
            "GET",
            "HEAD",
            "PUT",
            "PATCH",
            "POST",
            "DELETE",
            "OPTIONS"
        ],
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
    });
    // Set up Swagger
    const swaggerConfig = new _swagger.DocumentBuilder().setTitle("Puri Bunda Entry API Documentation").setDescription("This is the API documentation for Puri Bunda Entry to help you get started with the API.").setVersion("1.0").build();
    const document = _swagger.SwaggerModule.createDocument(app, swaggerConfig);
    _swagger.SwaggerModule.setup("swagger", app, document);
    // Get port from config with a default value
    const port = configService.get("app.APP_PORT", 8080);
    // Start the application
    await app.listen(port);
}
// Bootstrap the application
bootstrap();

//# sourceMappingURL=main.js.map