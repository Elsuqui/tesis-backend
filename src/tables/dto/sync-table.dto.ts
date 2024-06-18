import { IsOptional, IsString, Length } from 'class-validator';

export class SyncTableDto {
  @IsOptional()
  status: string;
  @IsString()
  @Length(3, 255)
  issuedBy: string;
  @IsString()
  @Length(3, 255)
  phoneManufacturer: string;
}
