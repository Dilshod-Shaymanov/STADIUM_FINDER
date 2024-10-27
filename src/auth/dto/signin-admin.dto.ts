import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInAdminDto {

  @ApiProperty({
    example: "sardor11",
    description: "Admin login",
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: "$Ard0r11",
    description: "Admin password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
