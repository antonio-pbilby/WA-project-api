import { Injectable } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Transaction } from 'objection';

@Injectable()
export class OrderRepository {
  public async insert(orderData: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(orderData);
  }

  public async listByUserId(userId: number, transaction?: Transaction): Promise<Order[]> {
    return Order.query(transaction).where({ userId });
  }

  public async findByOrderId(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction)
      .where({ id })
      .first();
  }
}
