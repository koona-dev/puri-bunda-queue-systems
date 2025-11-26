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
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nik: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PatientType)
  patientType: PatientType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PatientClass)
  patientClass: PatientClass;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  haveAssurance: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  assuranceCode?: string | null;
}
