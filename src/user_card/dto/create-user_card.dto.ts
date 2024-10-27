import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserCardDto {
  @ApiProperty({
    example: 1,
    description: "User ID (ForiegnKey)",
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: "Humo card",
    description: "User Card Name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "+998944454647",
    description: "User phone number",
  })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "9860 9896 9889 6556",
    description: "User Card number",
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: 2024,
    description: "User Card year",
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    example: 11,
    description: "User Card month",
  })
  @IsNumber()
  month: number;

  @ApiProperty({
    example: false,
    description: "User Card is activate",
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "User Card is main",
  })
  @IsOptional()
  @IsBoolean()
  is_main: boolean;
}
