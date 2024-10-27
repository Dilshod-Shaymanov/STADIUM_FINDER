import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: "Sardor",
    description: "User Full Name",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "sardor@mail.com",
    description: "User email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "+998944454647",
    description: "User phone number",
  })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "@sardor_22",
    description: "User Telegram link",
  })
  @IsOptional()
  @IsString()
  tg_link: string;

  @ApiProperty({
    example: "$aRd0r11",
    description: "User password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "$aRd0r11",
    description: "User confirm password",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: "photo.jpg",
    description: "User photo",
  })
  @IsOptional()
  @IsString()
  photo: string;
}
