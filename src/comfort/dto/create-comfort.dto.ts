import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComfortDto {
  @ApiProperty({
    example: 'Comfort',
    description: 'Comfort nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
