import { IsDate, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

import { QueueType } from "../utils/queue-type.enum";
import { Priority } from "../utils/priority.enum";
import { ServiceType } from "../utils/service-type";
import { ReferenceType } from "../utils/reference-type.enum";
import { QueueStatus } from "../utils/queue-status.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateQueueDto {
  @ApiPropertyOptional({ enum: QueueType })
  @IsOptional()
  @IsEnum(QueueType)
  queueType?: QueueType;

  @ApiPropertyOptional({ enum: Priority })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiPropertyOptional({ enum: ServiceType })
  @IsOptional()
  @IsEnum(ServiceType)
  serviceType?: ServiceType;

  @ApiPropertyOptional({ enum: ReferenceType })
  @IsOptional()
  @IsEnum(ReferenceType)
  referenceType?: ReferenceType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  symptomsStartDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  previousTreatment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  reservationDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  preferredTime?: string;

  @ApiPropertyOptional({ enum: QueueStatus })
  @IsOptional()
  @IsEnum(QueueStatus)
  status?: QueueStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  staffNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
