import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CookieService {
  private readonly cookieConfigs: Record<
    "access",
    { name: string; maxAge: number }
  >;
  private readonly cookieDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.cookieConfigs = {
      access: {
        name: configService.get<string>("ACCESS_TOKEN_COOKIE_NAME")!,
        maxAge: configService.get<number>("JWT_ACCESS_TOKEN_EXPIRATION_TIME")!,
      },
    };
    this.cookieDomain = configService.get<string>("COOKIE_DOMAIN")!;
  }

  async generateCookie(token: string): Promise<string> {
    const { name: cookieName, maxAge } = this.cookieConfigs["access"];

    return `${cookieName}=${token}; Domain=${this.cookieDomain}; Path=/; Max-Age=${Number(maxAge)}; HttpOnly;`;
  }

  async removeCookie(): Promise<string[]> {
    const cookieNames = Object.values(this.cookieConfigs).map(
      (config) => config.name
    );
    return cookieNames.map(
      (cookieName) =>
        `${cookieName}=; Domain=${this.cookieDomain}; Path=/; Max-Age=0; HttpOnly;`
    );
  }
}
