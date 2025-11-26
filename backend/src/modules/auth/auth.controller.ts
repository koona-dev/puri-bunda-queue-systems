import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";

import { ApiBody, ApiTags } from "@nestjs/swagger";
import { SignupBody } from "./dto/signup.body";
import { LoginPatientBody, LoginStaffBody } from "./dto/login.body";
import { CookieService } from "./services/cookie.service";
import JwtAuthenticationGuard from "./utils/jwt-authentication.guard";
import { AuthService } from "./services/auth.service";
import { comparePassword } from "src/utils/encrypt";
import { JwtAuthService } from "./services/jwt-auth.service";
import {
  RequestWithPatient,
  RequestWithStaff,
} from "./entities/req-user.entity";
import { JwtPatient, JwtStaff } from "./entities/jwt-user.entity";
import { Staff } from "../master/entities/staff.entity";
import { Patients } from "../master/entities/patients.entity";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject("JWT_AUTH_SERVICE")
    private readonly jwtAuthService: JwtAuthService,
    @Inject("COOKIE_SERVICE")
    private readonly cookieService: CookieService
  ) {}

  @Post("/signup")
  @ApiBody({ type: SignupBody })
  async signup(@Body() body: SignupBody) {
    const user = await this.authService.register(body);
    return user;
  }

  @Post("/login/staff")
  @ApiBody({ type: LoginStaffBody })
  async loginStaff(
    @Req() request: RequestWithStaff,
    @Body() body: LoginStaffBody
  ) {
    const staff = await this.authService.getByUsername(body.username);

    if (
      !staff?.password ||
      !(await comparePassword(staff.password, body.password))
    ) {
      throw new UnauthorizedException("Invalid Credentials!");
    }

    const jwtUser = await this.jwtAuthService.generateJwtUser<Staff, JwtStaff>(
      staff
    );

    if (request.res) {
      if (!jwtUser.accessToken) {
        throw new InternalServerErrorException("Tokens not generated");
      }

      const cookies = [
        await this.cookieService.generateCookie(jwtUser.accessToken),
      ];
      request.res.setHeader("Set-Cookie", cookies);
    }

    return jwtUser;
  }

  @Post("/login/patient")
  @ApiBody({ type: LoginPatientBody })
  async loginPatient(
    @Req() request: RequestWithPatient,
    @Body() body: LoginPatientBody
  ) {
    const patient = await this.authService.getByNik(body.nik);

    if (!patient) {
      throw new UnauthorizedException("Invalid Credentials!");
    }

    const jwtUser = await this.jwtAuthService.generateJwtUser<
      Patients,
      JwtPatient
    >(patient);

    if (request.res) {
      if (!jwtUser.accessToken) {
        throw new InternalServerErrorException("Tokens not generated");
      }

      const cookies = [
        await this.cookieService.generateCookie(jwtUser.accessToken),
      ];
      request.res.setHeader("Set-Cookie", cookies);
    }

    return jwtUser;
  }

  @Post("/logout")
  @UseGuards(JwtAuthenticationGuard)
  async logOut(@Req() request: RequestWithStaff | RequestWithPatient) {
    if (request.res) {
      const cookies = await this.cookieService.removeCookie();
      request.res.setHeader("Set-Cookie", cookies);
    }
  }
}
