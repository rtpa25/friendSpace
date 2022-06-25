import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const currentUserId = request.session.getUserId();
    if (!currentUserId) throw new BadRequestException('no such user exists');
    const currentUser = await EmailPassword.getUserById(currentUserId);
    const currentUserEmail = currentUser.email;
    request.currentUserEmail = currentUserEmail;
    return handler.handle();
  }
}
