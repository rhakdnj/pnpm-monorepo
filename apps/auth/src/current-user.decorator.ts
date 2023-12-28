import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './user/entity/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
