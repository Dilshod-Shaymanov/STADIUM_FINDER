import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ValidationExaption } from "../excaptions/validation.exaption";

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    console.log(metatype);

    const object = plainToInstance(metatype, value); // kelayotgan so'rovlarni obyekt ga o'tkazib beradi
    console.log(object);

    const errors = await validate(object);
    if (errors.length > 0) {
      let messages = errors.map((err) => {
        return `${err.property}: ${Object.values(err.constraints).join(" | ")}`;
      });
      throw new ValidationExaption(messages);
      //   throw new BadRequestException("Validation failed");
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
