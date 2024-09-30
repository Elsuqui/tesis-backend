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
import { createResponse } from 'src/common/dto/response-dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async findAll() {
    return createResponse(await this.sessionsService.findAll());
  }

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    return createResponse(await this.sessionsService.create(createSessionDto));
  }

  @Post(':uuid/extends')
  async extendSession(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return createResponse(await this.sessionsService.extendSession(uuid));
  }

  @Get(':uuid/check')
  async checkSessionStatus(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return createResponse(
      await this.sessionsService.checkSessionExpiration(uuid),
    );
  }
}
