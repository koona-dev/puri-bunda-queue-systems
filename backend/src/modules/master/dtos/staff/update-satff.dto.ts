import {
  IsBoolean,  
  IsDateString,
  IsOptional,  
  IsString,
} from "class-validator";
import { Type } from "class-transformer";


export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  nik?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
@Type(() => Date)
  lastLoginAt?: Date;
}
