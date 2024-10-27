import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "Sardor",
    description: "Admin Name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "sardor11",
    description: "Admin login",
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: "@sardor_tg",
    description: "Admin telegram link",
  })
  @IsString()
  @IsNotEmpty()
  tg_link: string;

  @ApiProperty({
    example: "photo.jpg",
    description: "Admin photo",
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({
    example: "$Ard0r11",
    description: "Admin password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "$Ard0r11",
    description: "Admin confirm password",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: false,
    description: "Admin activligi",
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Admin creatorligi",
  })
  @IsBoolean()
  @IsNotEmpty()
  is_creator: boolean;

  @ApiProperty({
    example: "s3dasf242HJ34fggd34K23GH34vdsv",
    description: "Admin hashed refresh token",
  })
  @IsString()
  @IsOptional()
  hashed_refresh_token?: string;
}
