import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", ctx.getHandler());
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return roles.includes(user.role);
  }
}
