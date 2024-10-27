import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({
    example: "Chilonzor",
    description: "District kocha nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: "Region Id (ForiegnKey)",
  })
  @IsNumber()
  regionId: number;
}
