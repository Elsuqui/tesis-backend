import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderDetails } from './create-order-detail';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsUUID('4')
  sessionUuid: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetails)
  orderDetails: CreateOrderDetails[];
}
