import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

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
    } catch (e) {
      console.log('Error: ', e.code);
      if (e.code === '23505') {
        throw new Error('Category already exists');
      }
    }
  }

  async findAll() {
    try {
      const results = await this.categoryRepository.find();
      console.log('results: ', results);
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
    try {
      const category = await this.findOne(id);
      const updatedAt = new Date().toISOString();
      console.log(updatedAt);
      await this.categoryRepository.update(id, {
        ...updateCategoryDto,
        updatedAt,
      });
      return {
        ...category,
        ...updateCategoryDto,
        updatedAt,
      };
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundException) {
        throw new Error('Category not found');
      }
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.categoryRepository.softDelete(id);
      return 'Category deleted';
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundException) {
        throw new Error('Category not found');
      }
    }
  }
}
