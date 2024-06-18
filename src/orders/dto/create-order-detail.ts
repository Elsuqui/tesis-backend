import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDetails {
  @IsPositive()
  productId: number;
  @IsNumber()
  quantity: number; // Quantity of the product
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number; // Unit price
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;
  //discount: number; Future feature
}
