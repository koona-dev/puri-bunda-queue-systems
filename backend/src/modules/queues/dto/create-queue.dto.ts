import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

import { Priority } from "../utils/priority.enum";
import { QueueType } from "../utils/queue-type.enum";
import { ReferenceType } from "../utils/reference-type.enum";
import { ServiceType } from "../utils/service-type";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateQueueDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clinicId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  staffId: string;

  @ApiProperty({ enum: QueueType })
  @IsNotEmpty()
  @IsEnum(QueueType)
  queueType: QueueType;

  @ApiProperty({ enum: Priority })
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({ enum: ServiceType })
  @IsNotEmpty()
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @ApiProperty({ enum: ReferenceType })
  @IsNotEmpty()
  @IsEnum(ReferenceType)
  referenceType: ReferenceType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  chiefComplaint: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  symptoms: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  symptomsStartDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  previousTreatment?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  reservationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  preferredTime: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  staffNotes?: string | null;
}
