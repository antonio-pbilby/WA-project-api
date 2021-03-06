import { forwardRef, HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';
import { OrderModule } from 'modules/order/module';

import { AuthController } from './controllers/auth';
import { TestController } from './controllers/test';
import { UserController } from './controllers/user';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule, forwardRef(() => OrderModule)],
  controllers: [AuthController, UserController, TestController],
  providers: [AuthService, UserRepository, UserService],
  exports: [UserRepository]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
