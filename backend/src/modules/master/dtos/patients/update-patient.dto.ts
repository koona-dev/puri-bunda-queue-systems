import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
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
  @IsDate()
  @Type(() => Date)
  birthDate?: Date;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ enum: PatientType })
  @IsOptional()
  @IsEnum(PatientType)
  patientType?: PatientType;

  @ApiPropertyOptional({ enum: PatientClass })
  @IsOptional()
  @IsEnum(PatientClass)
  patientClass?: PatientClass;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveAssurance?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  assuranceCode?: string;
}
