import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class SignInUserDto {
  @ApiProperty({
    example: "sardor@mail.com",
    description: "User email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "$aRd0r11",
    description: "User password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
