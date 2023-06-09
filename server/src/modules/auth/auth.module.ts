import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthModel } from './auth.model';
import { CheckAuthMiddleware } from '../../middlewares/check-auth.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [AuthModel]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
