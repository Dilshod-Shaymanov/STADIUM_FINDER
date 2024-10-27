import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStatusDto {
  @ApiProperty({
    example: "faol",
    description: "Status malumoti",
  })
  @IsString()
  @IsNotEmpty()
  status_name: string;
}
