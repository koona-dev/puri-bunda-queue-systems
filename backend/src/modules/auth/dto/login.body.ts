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
  password!: string;
}

export class LoginPatientBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nik: string;
}
