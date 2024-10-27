import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMediaDto {
  @ApiProperty({
    example: 1,
    description: "Stadium Id",
  })
  @IsNumber()
  stadiumId: number;

  @ApiProperty({
    example: "photo.jpg",
    description: "Stadium photo",
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({
    example: "of the best stadium",
    description: "Stadium description",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
