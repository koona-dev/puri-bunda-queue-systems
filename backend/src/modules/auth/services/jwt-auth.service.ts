import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthService {
  private readonly tokenSecret: string;
  private readonly tokenExpiration: number;

  constructor(private readonly configService: ConfigService) {
    this.tokenSecret = configService.get<string>("JWT_ACCESS_TOKEN_SECRET")!;
    this.tokenExpiration = configService.get<number>(
      "JWT_ACCESS_TOKEN_EXPIRATION_TIME"
    )!;
  }

  async verifyAccessToken<R>(token: string, secret: string): Promise<R> {
    try {
      return jwt.verify(token, secret) as R;
    } catch (err) {
      throw new HttpException(
        "expired or invalid token",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  async generateJwtUser<T, R>(payload: T): Promise<R> {
    const token = await jwt.sign(payload, this.tokenSecret, {
      expiresIn: Number(this.tokenExpiration),
    });

    return {
      payload,
      expiresIn: this.tokenExpiration,
      accessToken: token,
    } as R;
  }
}
