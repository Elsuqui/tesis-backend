import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 50)
  name: string;
  @IsString()
  @Length(3, 250)
  description: string;
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
  @IsNumber()
  categoryId: number;
}
