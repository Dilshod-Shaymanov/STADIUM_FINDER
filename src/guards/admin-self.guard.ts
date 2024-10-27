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
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // guard logikasi yoziladi
    const request = context.switchToHttp().getRequest();
    // console.log(request);

    if (String(request.user.sub) !== request.params.id) {
      throw new ForbiddenException({
        message: "Ruxsat etilmagan foydalanuvchi",
      });
    }

    return true;
  }
}
