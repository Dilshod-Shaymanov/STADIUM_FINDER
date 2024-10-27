import { Injectable } from "@nestjs/common";
import * as FormData from "form-data";
import axios from "axios";

@Injectable()
export class SmsService {
  // SMS yuborish funksiyasi
  async sendSMS(phone_number: string, otp: string) {
    const data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", `Bu Eskiz dan test`);
    data.append("from", "4546");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
        ...data.getHeaders(),
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.log(
        "Error sending SMS:",
        error.response?.data || error.message
      );
      return { status: 500, message: "SMS yuborishda xatolik yuz berdi." };
    }
  }

  // Token olish funksiyasi
  async getToken(email: string, password: string) {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://notify.eskiz.uz/api/auth/login",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log("Token received:", response.data);
      return response.data; 
    } catch (error) {
      console.log(
        "Error getting token:",
        error.response?.data || error.message
      );
      return { status: 500, message: "Token olishda xatolik yuz berdi." };
    }
  }

  // Tokenni yangilash funksiyasi
  async refreshToken() {
    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://notify.eskiz.uz/api/auth/refresh",
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
    };

    try {
      const response = await axios(config);
      console.log("Token refreshed:", response.data);
      return response.data;
    } catch (error) {
      console.log(
        "Error refreshing token:",
        error.response?.data || error.message
      );
      return { status: 500, message: "Token yangilashda xatolik yuz berdi." };
    }
  }
}
