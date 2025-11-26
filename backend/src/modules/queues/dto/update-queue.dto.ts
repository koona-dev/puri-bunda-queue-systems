import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

import { QueueType } from "../utils/queue-type.enum";
import { Priority } from "../utils/priority.enum";
import { ServiceType } from "../utils/service-type";
import { ReferenceType } from "../utils/reference-type.enum";
import { QueueStatus } from "../utils/queue-status.enum";

export class UpdateQueueDto {
  @IsOptional()
  @IsEnum(QueueType)
  queueType?: QueueType;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsEnum(ServiceType)
  serviceType?: ServiceType;

  @IsOptional()
  @IsEnum(ReferenceType)
  referenceType?: ReferenceType;

  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  symptomsStartDate?: Date;

  @IsOptional()
  @IsString()
  previousTreatment?: string;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  reservationDate?: Date;

  @IsOptional()
  @IsString()
  preferredTime?: string;

  @IsOptional()
  @IsEnum(QueueStatus)
  status?: QueueStatus;

  @IsOptional()
  @IsString()
  staffNotes?: string;

  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
