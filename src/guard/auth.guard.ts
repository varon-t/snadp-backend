import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization == null) {
      throw new UnauthorizedException('Authentication failed: token not provided.');
    } else if(request.headers.authorization != 'Bearer VALID_TOKEN') {
      throw new UnauthorizedException('Authentication failed: Invalid bearer token.');
    } else {
      return request.headers.authorization === 'Bearer VALID_TOKEN';
    }
  }
}
