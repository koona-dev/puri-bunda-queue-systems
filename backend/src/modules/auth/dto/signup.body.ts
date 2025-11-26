import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from "class-validator";

export class SignupBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  loketNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nik?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @IsStrongPassword(
    {
      minLength: 8,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter and contain at least one symbol",
    }
  )
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;
}
