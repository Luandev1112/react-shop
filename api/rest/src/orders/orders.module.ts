import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController, OrderStatusController } from './orders.controller';

@Module({
  controllers: [OrdersController, OrderStatusController],
  providers: [OrdersService],
})
export class OrdersModule {}
