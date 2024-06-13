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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { createResponse } from 'src/common/dto/response-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return createResponse(product, 'Product created');
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return createResponse(products, 'List of products');
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    return createResponse(product, 'Product found');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = this.productsService.update(id, updateProductDto);
    return createResponse(product, 'Product updated');
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const product = this.productsService.remove(id);
    return createResponse(product, 'Product removed');
  }
}
