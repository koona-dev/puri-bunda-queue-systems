"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _signupbody = require("./dto/signup.body");
const _loginbody = require("./dto/login.body");
const _cookieservice = require("./services/cookie.service");
const _jwtauthenticationguard = /*#__PURE__*/ _interop_require_default(require("../../utils/guards/jwt-authentication.guard"));
const _authservice = require("./services/auth.service");
const _encrypt = require("../../utils/encrypt");
const _jwtauthservice = require("./services/jwt-auth.service");
const _requserentity = require("./entities/req-user.entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let AuthController = class AuthController {
    async signup(body) {
        const user = await this.authService.register(body);
        return user;
    }
    async loginStaff(request, body) {
        const staff = await this.authService.getByUsername(body.username);
        if (!staff?.password || !await (0, _encrypt.comparePassword)(staff.password, body.password)) {
            throw new _common.UnauthorizedException("Invalid Credentials!");
        }
        const jwtUser = await this.jwtAuthService.generateJwtUser(staff);
        if (request.res) {
            if (!jwtUser.accessToken) {
                throw new _common.InternalServerErrorException("Tokens not generated");
            }
            const cookies = [
                await this.cookieService.generateCookie(jwtUser.accessToken)
            ];
            request.res.setHeader("Set-Cookie", cookies);
        }
        return jwtUser;
    }
    async loginPatient(request, body) {
        const patient = await this.authService.getByNik(body.nik);
        if (!patient) {
            throw new _common.UnauthorizedException("Invalid Credentials!");
        }
        const jwtUser = await this.jwtAuthService.generateJwtUser(patient);
        if (request.res) {
            if (!jwtUser.accessToken) {
                throw new _common.InternalServerErrorException("Tokens not generated");
            }
            const cookies = [
                await this.cookieService.generateCookie(jwtUser.accessToken)
            ];
            request.res.setHeader("Set-Cookie", cookies);
        }
        return jwtUser;
    }
    async logOut(request) {
        if (request.res) {
            const cookies = await this.cookieService.removeCookie();
            request.res.setHeader("Set-Cookie", cookies);
        }
    }
    constructor(authService, jwtAuthService, cookieService){
        this.authService = authService;
        this.jwtAuthService = jwtAuthService;
        this.cookieService = cookieService;
    }
};
_ts_decorate([
    (0, _common.Post)("/signup"),
    (0, _swagger.ApiBody)({
        type: _signupbody.SignupBody
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _signupbody.SignupBody === "undefined" ? Object : _signupbody.SignupBody
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
_ts_decorate([
    (0, _common.Post)("/login/staff"),
    (0, _swagger.ApiBody)({
        type: _loginbody.LoginStaffBody
    }),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _requserentity.RequestWithStaff === "undefined" ? Object : _requserentity.RequestWithStaff,
        typeof _loginbody.LoginStaffBody === "undefined" ? Object : _loginbody.LoginStaffBody
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "loginStaff", null);
_ts_decorate([
    (0, _common.Post)("/login/patient"),
    (0, _swagger.ApiBody)({
        type: _loginbody.LoginPatientBody
    }),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _requserentity.RequestWithPatient === "undefined" ? Object : _requserentity.RequestWithPatient,
        typeof _loginbody.LoginPatientBody === "undefined" ? Object : _loginbody.LoginPatientBody
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "loginPatient", null);
_ts_decorate([
    (0, _common.Post)("/logout"),
    (0, _common.UseGuards)(_jwtauthenticationguard.default),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
AuthController = _ts_decorate([
    (0, _swagger.ApiTags)("Authentication"),
    (0, _common.Controller)("auth"),
    _ts_param(0, (0, _common.Inject)("AUTH_SERVICE")),
    _ts_param(1, (0, _common.Inject)("JWT_AUTH_SERVICE")),
    _ts_param(2, (0, _common.Inject)("COOKIE_SERVICE")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService,
        typeof _jwtauthservice.JwtAuthService === "undefined" ? Object : _jwtauthservice.JwtAuthService,
        typeof _cookieservice.CookieService === "undefined" ? Object : _cookieservice.CookieService
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map