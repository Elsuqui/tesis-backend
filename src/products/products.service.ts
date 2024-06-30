import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import handleDBError from 'src/common/utils/db_error_handler';
import {
  S3Client,
  PutObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const category = await this.categoryService.findOne(
        createProductDto.categoryId,
      );
      const product = this.productRepository.create({
        ...createProductDto,
        category,
      });
      return await this.productRepository.save(product);
    } catch (error) {
      handleDBError(error);
    }
  }

  async findAll(query?: string) {
    const queryLike = `%${query}%`;
    //Arroz con menestra
    const result = await this.productRepository.find({
      where: query ? { name: ILike(queryLike) } : {},
      relations: { category: true },
    });
    return result;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if (updateProductDto.categoryId) {
      await this.categoryService.findOne(updateProductDto.categoryId);
    }
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return await this.productRepository.softRemove(product!);
  }

  async addImageToProduct(id: number, file: Express.Multer.File) {
    const product = await this.findOne(id);
    const image = await this.saveProductImageToS3(id, file);
    product.image_url = image.imageUrl;
    return await this.productRepository.save(product);
  }

  async saveProductImageToS3(id: number, file: Express.Multer.File) {
    // Initialize S3 client
    if (
      !process.env.AWS_S3_ACCESS_KEY ||
      !process.env.AWS_S3_SECRET_KEY ||
      !process.env.AWS_S3_REGION_NAME ||
      !process.env.AWS_S3_BUCKET_NAME
    ) {
      throw new Error('Failed to upload image missing configuration');
    }
    const s3Client = new S3Client({
      region: process.env.AWS_S3_REGION_NAME,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      },
    });
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    //const fileType = (await fromBuffer(file.buffer)) ?? { ext: 'jpg' };
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucketName,
      Key: `products/${id}`,
      ContentType: file.mimetype,
      //ACL: 'public-read', // Make the image public
    };
    // Save product image to S3
    try {
      const response: PutObjectCommandOutput = await s3Client.send(
        new PutObjectCommand(input),
      );
      if (response.$metadata.httpStatusCode !== 200) {
        throw new Error('Failed to upload image from S3');
      }
      const imageUrl = `https://${bucketName}.s3.${process.env.AWS_S3_REGION_NAME}.amazonaws.com/${input.Key}`;
      return { imageUrl };
    } catch (err) {
      console.log(err);
      throw new Error('Failed to upload image');
    }
  }
}
