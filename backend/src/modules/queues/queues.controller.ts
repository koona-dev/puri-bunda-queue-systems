import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import QueuesService from "./queues.service";
import {
  FindManyQueuesQueryParams,
  FindOneQueuesQueryParams,
} from "./dto/queues-query.params";
import { CreateQueueDto } from "./dto/create-queue.dto";
import { UpdateQueueDto } from "./dto/update-queue.dto";
import JwtAuthenticationGuard from "src/utils/guards/jwt-authentication.guard";

@Controller("queues")
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findOne(@Query() query: FindOneQueuesQueryParams) {
    return this.queuesService.findOne(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get("list")
  findMany(@Query() query: FindManyQueuesQueryParams) {
    return this.queuesService.findMany(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createQueuesDto: CreateQueueDto) {
    return this.queuesService.create(createQueuesDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(":queueId")
  update(
    @Param("queueId") queueId: string,
    @Body() updateQueuesDto: UpdateQueueDto
  ) {
    return this.queuesService.update({ ...updateQueuesDto, id: queueId });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(":queueId")
  remove(@Param("queueId") queueId: string) {
    return this.queuesService.delete(queueId);
  }
}
