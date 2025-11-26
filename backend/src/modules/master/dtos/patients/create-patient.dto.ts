import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

import { Gender } from "../../utils/gender.enum";
import { PatientType } from "../../utils/patient-type.enum";
import { PatientClass } from "../../utils/patient-class.enum";

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  nik: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEnum(PatientType)
  patientType: PatientType;

  @IsNotEmpty()
  @IsEnum(PatientClass)
  patientClass: PatientClass;

  @IsNotEmpty()
  @IsBoolean()
  haveAssurance: boolean;

  @IsOptional()
  @IsString()
  assuranceCode?: string | null;
}
