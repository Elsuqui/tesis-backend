import {
  IsArray,
  //IsOptional,
  //IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMenuDetailDto } from './create-menu-detail.dto';

export class CreateBulkMenuDetailsDto {
  //   @IsPositive()
  //   @IsOptional()
  //   menuId: number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuDetailDto)
  details: CreateMenuDetailDto[];
}
