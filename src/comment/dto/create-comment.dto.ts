import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({
    example: 1,
    description: "User Id (ForiegnKey)",
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 1,
    description: "Stadium Id (ForiegnKey)",
  })
  @IsNumber()
  stadiumId: number;

  @ApiProperty({
    example: "tasurot",
    description: "Tasuroti haqida",
  })
  @IsString()
  @IsNotEmpty()
  impression: string;
}
