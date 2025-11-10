import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  loketNumber: string;

  @IsOptional()
  @IsString()
  nik?: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;
}
