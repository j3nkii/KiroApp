import { Controller, Get, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { WorkOrderService } from '../services/work-order.service';
import { WorkOrderResponse } from '../interfaces/work-order.interface';

@Controller('work-orders')
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Get()
  async getAllWorkOrders(): Promise<WorkOrderResponse[]> {
    try {
      return await this.workOrderService.getAllWorkOrders();
    } catch (error) {
      console.error('Error in getAllWorkOrders controller:', error);
      throw new HttpException(
        'Failed to retrieve work orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getWorkOrderById(@Param('id', ParseIntPipe) id: number): Promise<WorkOrderResponse> {
    try {
      const workOrder = await this.workOrderService.getWorkOrderById(id);
      
      if (!workOrder) {
        throw new HttpException(
          `Work order with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return workOrder;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      console.error('Error in getWorkOrderById controller:', error);
      throw new HttpException(
        'Failed to retrieve work order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}