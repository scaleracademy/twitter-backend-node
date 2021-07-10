import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

class TokenAuthorizer {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  protected async authorizeToken(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request?.headers?.authorization) {
      throw new UnauthorizedException('Missing authorization header');
    }
    if (!request.headers.authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header');
    }
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }
    const user = this.authService.getUserFromSessionToken(token);
    request.user = user;
    return true;
  }
}

@Injectable()
export class OptionalAuthGuard extends TokenAuthorizer implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return await this.authorizeToken(context);
    } catch (e) {
      return true;
    }
  }
}

@Injectable()
export class RequiredAuthGuard extends TokenAuthorizer implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.authorizeToken(context);
  }
}
