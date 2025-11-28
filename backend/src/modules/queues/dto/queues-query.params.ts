import { IsDate, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

import { QueueType } from "../utils/queue-type.enum";
import { Priority } from "../utils/priority.enum";
import { ServiceType } from "../utils/service-type";
import { ReferenceType } from "../utils/reference-type.enum";
import { QueueStatus } from "../utils/queue-status.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindOneQueuesQueryParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  clinicId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  doctorId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  staffId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  queueNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;
}

export class FindManyQueuesQueryParams {
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
  @IsDate()
  @Type(() => Date)
  reservationDate?: Date;

  @ApiPropertyOptional({ enum: QueueStatus })
  @IsOptional()
  @IsEnum(QueueStatus)
  status?: QueueStatus;
}
