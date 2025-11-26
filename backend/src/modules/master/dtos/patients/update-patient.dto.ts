import { PartialType } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

import { Gender } from "../../utils/gender.enum";
import { PatientType } from "../../utils/patient-type.enum";
import { PatientClass } from "../../utils/patient-class.enum";
import { CreatePatientDto } from "./create-patient.dto";

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsOptional()
  @IsString()
  nik?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  birthDate?: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  phone?: string;

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
  @IsString()
  assuranceCode?: string;
}
