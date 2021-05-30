import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from 'modules/admin/module';
import { CommonModule } from 'modules/common/module';

import { OrderController } from './controllers/order';
import { OrderRepository } from './repositories/order';
import { OrderService } from './services/order';

@Module({
  imports: [CommonModule, forwardRef(() => AdminModule)],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository]
})
export class OrderModule {}
