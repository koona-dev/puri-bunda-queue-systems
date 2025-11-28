"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtStrategy", {
    enumerable: true,
    get: function() {
        return JwtStrategy;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _passport = require("@nestjs/passport");
const _passportjwt = require("passport-jwt");
const _authservice = require("../services/auth.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let JwtStrategy = class JwtStrategy extends (0, _passport.PassportStrategy)(_passportjwt.Strategy) {
    async validate(payload) {
        if ("username" in payload) {
            return await this.authService.getByUsername(payload.username);
        }
        if ("nik" in payload) {
            return await this.authService.getByNik(payload.nik);
        }
        throw new _common.UnauthorizedException("Invalid payload");
    }
    constructor(authService, configService){
        const secretKey = configService.get("JWT_ACCESS_TOKEN_SECRET");
        super({
            jwtFromRequest: _passportjwt.ExtractJwt.fromExtractors([
                (request)=>{
                    return request?.cookies?.[this.cookieName];
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: secretKey
        }), this.authService = authService, this.configService = configService;
        this.cookieName = configService.get("ACCESS_TOKEN_COOKIE_NAME");
    }
};
JwtStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)("AUTH_SERVICE")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], JwtStrategy);

//# sourceMappingURL=jwt.strategy.js.map