import {
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @Length(3, 50)
  name: string;
  @IsString()
  @MaxLength(250)
  @IsOptional()
  description?: string;
  @IsBoolean()
  isActive: boolean;
}
