import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    // Add the TypeOrmModule import
    TypeOrmModule.forFeature([Category]),
    CommonModule,
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
