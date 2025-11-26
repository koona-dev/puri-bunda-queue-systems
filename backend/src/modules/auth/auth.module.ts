import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { JwtAuthService } from "./services/jwt-auth.service";
import { CookieService } from "./services/cookie.service";
import { JwtStrategy } from "./utils/jwt.strategy";

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    },
    {
      provide: "JWT_AUTH_SERVICE",
      useClass: JwtAuthService,
    },
    {
      provide: "COOKIE_SERVICE",
      useClass: CookieService,
    },
  ],
  exports: [],
})
export class AuthModule {}
