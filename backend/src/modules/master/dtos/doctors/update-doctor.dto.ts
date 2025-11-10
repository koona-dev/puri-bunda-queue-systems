import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsNumber()
  dayOfWeek: number;

  @IsOptional()
  @IsDateString()
  startTime: string;

  @IsOptional()
  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsNumber()
  quota: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
