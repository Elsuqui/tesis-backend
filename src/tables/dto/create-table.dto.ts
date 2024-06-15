import { IsString, Length } from 'class-validator';

export class CreateTableDto {
  @IsString()
  @Length(1, 50)
  businessCode: string;
}
