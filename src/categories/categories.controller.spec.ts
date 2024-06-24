import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'src/categories/entities/category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should create a new category', async () => {
    const createCategoryDto: CreateCategoryDto = { 
      name: 'Desserts'
    };

    const mockCategory = new Category()
    mockCategory.name = 'Desserts';

    jest.spyOn(service, 'create').mockResolvedValue(mockCategory);

    const result = await controller.create(createCategoryDto);
    const expectedResult = {
      'data': mockCategory,
      'message': 'Success'
    }

    expect(result).toEqual(expectedResult);
  });
});
