import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClinicDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
