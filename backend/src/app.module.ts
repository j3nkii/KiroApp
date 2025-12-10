import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkOrderController } from './controllers/work-order.controller';
import { WorkOrderService } from './services/work-order.service';
import { WorkOrderRepository } from './repositories/work-order.repository';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [],
  controllers: [AppController, WorkOrderController],
  providers: [AppService, WorkOrderService, WorkOrderRepository, DatabaseService],
})
export class AppModule {}
