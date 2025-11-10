import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { Gender } from "../../utils/gender.enum";
import { PatientType } from "../../utils/patient-type.enum";
import { PatientClass } from "../../utils/patient-class.enum";

export class FindOnePatientQueryParams {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @IsOptional()
  @IsString()
  nik?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  assuranceCode?: string;
}

export class FindManyPatientsQueryParams {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(PatientType)
  patientType?: PatientType;

  @IsOptional()
  @IsEnum(PatientClass)
  patientClass?: PatientClass;

  @IsOptional()
  @IsBoolean()
  haveAssurance?: boolean;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
