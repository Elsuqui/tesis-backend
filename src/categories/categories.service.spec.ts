import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  it('should create a new category', async () => {
    // Mock data
    const createCategoryDto = { name: 'New Category' };
    const mockCategory = new Category();
    mockCategory.id = 1;
    jest.spyOn(categoryRepository, 'create').mockReturnValue(mockCategory);
    jest.spyOn(categoryRepository, 'save').mockResolvedValue(mockCategory);

    // Call the service method
    const result = await categoriesService.create(createCategoryDto);

    // Assertions
    expect(result).toEqual(mockCategory);
  });

  describe('findOne', () => {
    it('should find a category by ID', async () => {
      // Mock data
      const categoryId = 1;
      const mockCategory = new Category();
      mockCategory.id = categoryId;
      jest.spyOn(categoryRepository, 'findOneByOrFail').mockResolvedValue(mockCategory);

      // Call the service method
      const result = await categoriesService.findOne(categoryId);

      // Assertions
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if category is not found', async () => {
      // Mock data
      const categoryId = 999;
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);

      // Call the service method
      try {
        await categoriesService.findOne(categoryId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Category not found');

      }
    });
  });
});
