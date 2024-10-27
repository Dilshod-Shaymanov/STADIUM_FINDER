import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // guard logikasi yoziladi
    const request = context.switchToHttp().getRequest();
    // console.log(request);

    if (!request.user.is_creator) {
      throw new ForbiddenException({
        message: "Ruxsat etilmagan foydalanuvchi",
      });
    }
    return true;
  }
}
