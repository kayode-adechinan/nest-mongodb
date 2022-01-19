import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationOptionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;
  @Type(() => Number)
  @IsInt()
  @Max(10)
  @IsOptional()
  limit?: number = 10;
}
