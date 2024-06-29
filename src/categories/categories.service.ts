import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import handleDBError from 'src/common/utils/db_error_handler';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      handleDBError(error);
    }
  }

  async findAll() {
    try {
      const results = await this.categoryRepository.find();
      return results;
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(id: number) {
    try {
      return await this.categoryRepository.findOneByOrFail({
        id,
      });
    } catch (e) {
      console.log(e);
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('Category not found');
      }
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const product = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });
    if (!product) {
      throw new NotFoundException('Category not found');
    }
    return await this.categoryRepository.save(product);
  }

  async remove(id: number) {
    try {
      const category = await this.findOne(id);
      return await this.categoryRepository.softRemove(category!);
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundException) {
        throw new Error('Category not found');
      }
    }
  }

  async showMenu() {
    const categories = await this.categoryRepository.find({
      relations: ['products'],
    });
    return { categories };
  }
}
