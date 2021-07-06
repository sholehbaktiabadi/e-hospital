import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AutheticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const requ = context.switchToHttp().getRequest();
    return requ.isAuthenticated();
  }
}
