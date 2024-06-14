import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDetailDto } from './create-menu-detail.dto';

export class UpdateMenuDetailDto extends PartialType(CreateMenuDetailDto) {}
