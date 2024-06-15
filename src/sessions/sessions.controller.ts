import {
  Controller,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Post(':uuid/extends')
  extendSession(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.sessionsService.extendSession(uuid);
  }
}
