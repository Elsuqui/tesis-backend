import { IsNumber, IsPositive } from 'class-validator';

export class CalculateOrderDetailDto {
  @IsPositive()
  productId: number;
  @IsNumber()
  quantity: number; // Quantity of the product
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number; // Unit price
}
