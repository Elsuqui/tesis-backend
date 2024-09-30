import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesService } from './categories/categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return the correct message from getHello()', () => {
    const result = appController.getHello();
    expect(result).toBe('Hello World!');
  });
});
