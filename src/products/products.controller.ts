import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { createResponse } from 'src/common/dto/response-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fromBuffer } from 'file-type';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return createResponse(product, 'Success');
  }

  @Get()
  async findAll(@Query('q') query?: string) {
    const products = await this.productsService.findAll(query);
    return createResponse(products);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    return createResponse(product);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, updateProductDto);
    return createResponse(product);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.remove(id);
    return createResponse(product);
  }

  @Post(':id/images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageProduct(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Validate file type using magic number and file extension
    const result = await fromBuffer(file.buffer);
    if (!result) {
      throw new BadRequestException('Invalid file');
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(result.mime)) {
      throw new BadRequestException(
        'Invalid file type, only supports jpeg, png and webp',
      );
    }
    return createResponse(
      await this.productsService.addImageToProduct(id, file),
    );
  }
}
