import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly cookieName: string;

  constructor(
    @Inject("AUTH_SERVICE")
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    const secretKey = configService.get<string>("JWT_ACCESS_TOKEN_SECRET");

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.[this.cookieName];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secretKey!,
    });

    this.cookieName = configService.get<string>("ACCESS_TOKEN_COOKIE_NAME")!;
  }

  async validate<T extends object>(payload: T) {
    if ("username" in payload) {
      return await this.authService.getByUsername((payload as any).username);
    }
    if ("nik" in payload) {
      return await this.authService.getByNik((payload as any).nik);
    }
    throw new UnauthorizedException("Invalid payload");
  }
}
