import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryValidator {
  @IsNumberString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  subCategory?: string;

  @IsString()
  @IsOptional()
  category?: string;
}
