import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsService', () => {
  let productService: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: CategoriesService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });
});
