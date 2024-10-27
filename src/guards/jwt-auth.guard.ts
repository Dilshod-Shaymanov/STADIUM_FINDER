import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // guard logikasi yoziladi
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: "Headerda Token berilmagan" });
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({
        message: "Bearer va token berilmagan!",
      });
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Token verifikatsiyadan o'tmadi!",
        error,
      });
    }
    request.user = payload;
    // console.log(request);
    
    return true;
  }
}
