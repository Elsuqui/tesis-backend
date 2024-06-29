import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { SyncTableDto } from './dto/sync-table.dto';
import { createResponse } from 'src/common/dto/response-dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async create(@Body() createTableDto: CreateTableDto) {
    return createResponse(await this.tablesService.create(createTableDto));
  }

  @Get()
  async findAll() {
    return createResponse(await this.tablesService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return createResponse(await this.tablesService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return createResponse(await this.tablesService.update(id, updateTableDto));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return createResponse(await this.tablesService.remove(id));
  }

  @Post(':id/sync')
  async tableSync(
    @Param('id', ParseIntPipe) id: number,
    @Body() syncTableDto: SyncTableDto,
  ) {
    return createResponse(await this.tablesService.tableSync(id, syncTableDto));
  }
}
