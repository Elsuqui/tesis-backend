import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { createResponse } from 'src/common/dto/response-dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return createResponse(await this.ordersService.create(createOrderDto));
  }

  @Get()
  async findAll() {
    return createResponse(await this.ordersService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return createResponse(await this.ordersService.findOne(id));
  }

  @Get('/session/:sessionUuid')
  async findOrdersBySession(
    @Param('sessionUuid', ParseUUIDPipe) sessionUuid: string,
  ) {
    return createResponse(
      await this.ordersService.findOrdersBySession(sessionUuid),
    );
  }
}
