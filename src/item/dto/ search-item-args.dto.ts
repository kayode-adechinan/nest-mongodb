import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchItemArgsDto {
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ required: false })
  searchTerm: string;
}
