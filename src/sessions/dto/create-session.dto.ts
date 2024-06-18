import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsPositive()
  tableId: number;
  @IsString()
  @IsOptional()
  status?: string;
  @IsString()
  issuedBy: string;
  @IsString()
  phoneManufacturer: string;
}
