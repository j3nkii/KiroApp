import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { WorkOrder, Customer, LineItem, WorkOrderDetail } from '../interfaces/work-order.interface';
import { transformObjectToCamelCase } from '../utils/data-transform.util';

@Injectable()
export class WorkOrderRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<WorkOrder[]> {
    try {
      const query = `
        SELECT 
          wo.id as work_order_id,
          wo.date_created,
          wo.last_updated,
          c.id as customer_id,
          c.full_name,
          c.primary_phone,
          c.email,
          wod.id as detail_id,
          wod.quantity,
          wod.cached_price,
          li.id as line_item_id,
          li.description,
          li.sku,
          li.item_type,
          li.price as current_price
        FROM work_orders wo
        INNER JOIN customers c ON wo.user_id = c.id
        LEFT JOIN work_order_details wod ON wo.id = wod.work_order_id
        LEFT JOIN line_items li ON wod.line_item_id = li.id
        ORDER BY wo.id, wod.id
      `;

      const result = await this.databaseService.query(query);
      return this.transformRowsToWorkOrders(result.rows);
    } catch (error) {
      console.error('Error fetching work orders:', error);
      throw new Error('Failed to fetch work orders from database');
    }
  }

  async findById(id: number): Promise<WorkOrder | null> {
    try {
      const query = `
        SELECT 
          wo.id as work_order_id,
          wo.date_created,
          wo.last_updated,
          c.id as customer_id,
          c.full_name,
          c.primary_phone,
          c.email,
          wod.id as detail_id,
          wod.quantity,
          wod.cached_price,
          li.id as line_item_id,
          li.description,
          li.sku,
          li.item_type,
          li.price as current_price
        FROM work_orders wo
        INNER JOIN customers c ON wo.user_id = c.id
        LEFT JOIN work_order_details wod ON wo.id = wod.work_order_id
        LEFT JOIN line_items li ON wod.line_item_id = li.id
        WHERE wo.id = $1
        ORDER BY wod.id
      `;

      const result = await this.databaseService.query(query, [id]);
      const workOrders = this.transformRowsToWorkOrders(result.rows);
      return workOrders.length > 0 ? workOrders[0] : null;
    } catch (error) {
      console.error('Error fetching work order by id:', error);
      throw new Error(`Failed to fetch work order with id ${id}`);
    }
  }

  private transformRowsToWorkOrders(rows: any[]): WorkOrder[] {
    const workOrderMap = new Map<number, WorkOrder>();

    for (const row of rows) {
      const workOrderId = row.work_order_id;

      if (!workOrderMap.has(workOrderId)) {
        const customer: Customer = transformObjectToCamelCase({
          id: row.customer_id,
          full_name: row.full_name,
          primary_phone: row.primary_phone,
          email: row.email,
        });

        const workOrder: WorkOrder = {
          id: workOrderId,
          dateCreated: row.date_created?.toISOString() || '',
          lastUpdated: row.last_updated?.toISOString() || '',
          customer,
          details: [],
          totalAmount: 0,
        };

        workOrderMap.set(workOrderId, workOrder);
      }

      // Add work order detail if it exists
      if (row.detail_id && row.line_item_id) {
        const lineItem: LineItem = transformObjectToCamelCase({
          id: row.line_item_id,
          description: row.description,
          sku: row.sku,
          item_type: row.item_type,
          current_price: row.current_price,
        });

        const detail: WorkOrderDetail = transformObjectToCamelCase({
          id: row.detail_id,
          quantity: row.quantity,
          cached_price: row.cached_price,
          line_item: lineItem,
        });

        const workOrder = workOrderMap.get(workOrderId);
        if (workOrder) {
          workOrder.details.push(detail);
        }
      }
    }

    // Calculate total amounts
    for (const workOrder of workOrderMap.values()) {
      workOrder.totalAmount = workOrder.details.reduce(
        (total, detail) => total + (detail.quantity * detail.cachedPrice),
        0
      );
    }

    return Array.from(workOrderMap.values());
  }
}