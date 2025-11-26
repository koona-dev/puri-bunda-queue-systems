import { AuthPatient, AuthStaff } from "./auth-user.entity";

export interface JwtStaff {
  staff: AuthStaff;
  expiresIn: number;
  accessToken: string;
}

export interface JwtPatient {
  patient: AuthPatient;
  expiresIn: number;
  accessToken: string;
}
