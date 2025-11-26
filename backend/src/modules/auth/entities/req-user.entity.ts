import { Request } from "express";
import { AuthPatient, AuthStaff } from "./auth-user.entity";

export interface RequestWithStaff extends Request {
  staff: AuthStaff;
}

export interface RequestWithPatient extends Request {
  patient: AuthPatient;
}
