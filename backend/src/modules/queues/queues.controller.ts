import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import QueuesService from "./queues.service";
import {
  FindManyQueuesQueryParams,
  FindOneQueuesQueryParams,
} from "./dto/queues-query.params";
import { CreateQueueDto } from "./dto/create-queue.dto";
import { UpdateQueueDto } from "./dto/update-queue.dto";

@Controller("queues")
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Get()
  findOne(@Query() query: FindOneQueuesQueryParams) {
    return this.queuesService.findOne(query);
  }

  @Get('list')
  findMany(@Query() query: FindManyQueuesQueryParams) {
    return this.queuesService.findMany(query);
  }

  @Post()
  create(@Body() createQueuesDto: CreateQueueDto) {
    return this.queuesService.create(createQueuesDto);
  }

  @Patch(":queueId")
  update(
    @Param("queueId") queueId: string,
    @Body() updateQueuesDto: UpdateQueueDto
  ) {
    return this.queuesService.update({ ...updateQueuesDto, id: queueId });
  }

  @Delete(":queueId")
  remove(@Param("queueId") queueId: string) {
    return this.queuesService.delete(queueId);
  }
}
