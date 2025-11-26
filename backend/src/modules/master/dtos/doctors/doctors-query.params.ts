import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class DoctorsQueryParams {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  createdAt?: Date;
}
