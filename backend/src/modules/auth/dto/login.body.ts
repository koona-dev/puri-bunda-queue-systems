import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from "class-validator";

export class LoginStaffBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

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
  password!: string;
}

export class LoginPatientBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nik: string;
}
