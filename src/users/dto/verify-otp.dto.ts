import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  verification_key: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsPhoneNumber("UZ")
  phone_number: string;
}
