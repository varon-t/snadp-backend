import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private clsService: ClsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization == null) {
      throw new UnauthorizedException(
        'Authentication failed: token not provided.',
      );
    } else if (request.headers.authorization != 'Bearer VALID_TOKEN') {
      throw new UnauthorizedException(
        'Authentication failed: Invalid bearer token.',
      );
    } else {
      this.clsService.set('user', 'user-name-from-token');
      console.log('User name: ', this.clsService.get('user'));
      return request.headers.authorization === 'Bearer VALID_TOKEN';
    }
  }
}
