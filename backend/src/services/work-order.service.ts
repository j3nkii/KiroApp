import { Injectable } from '@nestjs/common';
import { WorkOrderRepository } from '../repositories/work-order.repository';
import { WorkOrder, WorkOrderResponse } from '../interfaces/work-order.interface';

@Injectable()
export class WorkOrderService {
  constructor(private readonly workOrderRepository: WorkOrderRepository) {}

  async getAllWorkOrders(): Promise<WorkOrderResponse[]> {
    try {
      const workOrders = await this.workOrderRepository.findAll();
      return this.formatWorkOrdersForResponse(workOrders);
    } catch (error) {
      console.error('Error in getAllWorkOrders service:', error);
      throw new Error('Failed to retrieve work orders');
    }
  }

  async getWorkOrderById(id: number): Promise<WorkOrderResponse | null> {
    try {
      const workOrder = await this.workOrderRepository.findById(id);
      if (!workOrder) {
        return null;
      }
      const formatted = this.formatWorkOrdersForResponse([workOrder]);
      return formatted[0];
    } catch (error) {
      console.error('Error in getWorkOrderById service:', error);
      throw new Error(`Failed to retrieve work order with id ${id}`);
    }
  }

  private formatWorkOrdersForResponse(workOrders: WorkOrder[]): WorkOrderResponse[] {
    return workOrders.map(workOrder => ({
      id: workOrder.id,
      dateCreated: workOrder.dateCreated,
      lastUpdated: workOrder.lastUpdated,
      customer: {
        id: workOrder.customer.id,
        fullName: workOrder.customer.fullName,
        primaryPhone: workOrder.customer.primaryPhone,
        email: workOrder.customer.email,
      },
      details: workOrder.details.map(detail => ({
        id: detail.id,
        quantity: detail.quantity,
        cachedPrice: detail.cachedPrice,
        lineItem: {
          id: detail.lineItem.id,
          description: detail.lineItem.description,
          sku: detail.lineItem.sku,
          itemType: detail.lineItem.itemType,
          currentPrice: detail.lineItem.currentPrice,
        },
      })),
      totalAmount: this.calculateTotalAmount(workOrder.details),
    }));
  }

  private calculateTotalAmount(details: any[]): number {
    return details.reduce(
      (total, detail) => total + (detail.quantity * detail.cachedPrice),
      0
    );
  }
}