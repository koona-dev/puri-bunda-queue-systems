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
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindOnePatientQueryParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nik?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  assuranceCode?: string;
}

export class FindManyPatientsQueryParams {
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
  @IsDateString()
  @Type(() => Date)
  createdAt?: Date;
}
