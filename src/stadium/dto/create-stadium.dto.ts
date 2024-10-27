import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsDateString,
  Matches,
} from "class-validator";

export class CreateStadiumDto {
  @ApiProperty({
    example: 1,
    description: "Category unique Id (ForeignKey)",
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 1,
    description: "Owner unique Id (ForeignKey)",
  })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @ApiProperty({
    example: "stadium_finder_uzb_bot",
    description: "Stadium's Telegram bot contact (e.g., Telegram bot name)",
  })
  @IsString()
  @IsNotEmpty()
  contact_with: string;

  @ApiProperty({
    example: "Best Stadium",
    description: "Stadium name (stadion nomi)",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 500,
    description: "Stadium capacity (stadion hajmi)",
  })
  @IsNumber()
  @IsNotEmpty()
  volume: number;

  @ApiProperty({
    example: "Toshkent shahri",
    description: "Stadium address (stadion manzili)",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 1,
    description: "Region unique Id (ForeignKey)",
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({
    example: 1,
    description: "District unique Id (ForeignKey)",
  })
  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @ApiProperty({
    example: "41.2995,69.2401",
    description: "Stadium location (geographical coordinates)",
  })
  @IsArray()
  @IsNotEmpty()
  location: string[];

  @ApiProperty({
    example: "2024-11-23",
    description: "Stadium build date (qurilgan sanasi)",
  })
  @IsDateString()
  @IsNotEmpty()
  buildAt: Date;

  @ApiProperty({
    example: "11:30",
    description: "Start time (boshlanish vaqti) (HH:mm)",
  })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Start time must be in the format HH:mm",
  })
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({
    example: "13:00",
    description: "End time (tugash vaqti) (HH:mm)",
  })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "End time must be in the format HH:mm",
  })
  @IsNotEmpty()
  end_time: string;
}
