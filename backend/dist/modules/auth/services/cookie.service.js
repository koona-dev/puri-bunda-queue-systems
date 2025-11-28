"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CookieService", {
    enumerable: true,
    get: function() {
        return CookieService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CookieService = class CookieService {
    async generateCookie(token) {
        const { name: cookieName, maxAge } = this.cookieConfigs["access"];
        return `${cookieName}=${token}; Domain=${this.cookieDomain}; Path=/; Max-Age=${Number(maxAge)}; HttpOnly;`;
    }
    async removeCookie() {
        const cookieNames = Object.values(this.cookieConfigs).map((config)=>config.name);
        return cookieNames.map((cookieName)=>`${cookieName}=; Domain=${this.cookieDomain}; Path=/; Max-Age=0; HttpOnly;`);
    }
    constructor(configService){
        this.configService = configService;
        this.cookieConfigs = {
            access: {
                name: configService.get("ACCESS_TOKEN_COOKIE_NAME"),
                maxAge: configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")
            }
        };
        this.cookieDomain = configService.get("COOKIE_DOMAIN");
    }
};
CookieService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], CookieService);

//# sourceMappingURL=cookie.service.js.map