import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Matches } from "class-validator";

export class CreateStadiumTimeDto {
  @ApiProperty({
    example: 1,
    description: "Stadium unique Id (ForeignKey)",
  })
  @IsNumber()
  @IsNotEmpty()
  stadiumId: number;

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

  @ApiProperty({
    example: 500000.0,
    description: "Stadium vaqt narxi (500000.00)",
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
