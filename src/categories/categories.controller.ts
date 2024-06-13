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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { createResponse } from 'src/common/dto/response-dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);
    return createResponse(category, 'Category created');
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return createResponse(categories, 'List of categories');
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);
    return createResponse(category, 'Category found');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.update(id, updateCategoryDto);
    return createResponse(category, 'Category updated');
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.remove(id);
    return createResponse(category, 'Category removed');
  }
}
