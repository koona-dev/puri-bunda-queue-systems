"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _config = require("@nestjs/config");
const _default = (0, _config.registerAs)('app', ()=>({
        appEnv: process.env.APP_ENV || 'dev',
        host: process.env.APP_HOST || '0.0.0.0',
        port: {
            api: process.env.APP_PORT || 3000
        },
        appName: process.env.APP_NAME || 'template-aggregation',
        apiPrefix: process.env.API_PREFIX || '/api/'
    }));

//# sourceMappingURL=app.config.js.map