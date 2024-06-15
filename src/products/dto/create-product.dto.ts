import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 50)
  name: string;
  @IsString()
  @Length(0, 250)
  @IsOptional()
  description?: string;
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
  @IsNumber()
  categoryId: number;
}
