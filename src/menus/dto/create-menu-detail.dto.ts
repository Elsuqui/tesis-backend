import { IsPositive } from 'class-validator';

export class CreateMenuDetailDto {
  @IsPositive()
  productId: number;
  @IsPositive()
  tagId: number;
  @IsPositive()
  menuId: number;
}
