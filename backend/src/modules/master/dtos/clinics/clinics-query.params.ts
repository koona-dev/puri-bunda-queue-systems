import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class ClinicsQueryParams {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
