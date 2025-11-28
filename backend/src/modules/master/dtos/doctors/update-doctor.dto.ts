import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,  
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateDoctorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  dayOfWeek: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startTime: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endTime: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quota: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
