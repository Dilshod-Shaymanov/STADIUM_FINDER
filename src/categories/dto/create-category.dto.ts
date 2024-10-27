import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Sport',
    description: 'Category nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Parent Category Id',
  })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
