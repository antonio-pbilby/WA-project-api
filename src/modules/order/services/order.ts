import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'modules/admin/repositories/user';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository, private userRepository: UserRepository) {}

  public async create(orderData: IOrder): Promise<Order> {
    const { userId } = orderData;

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) throw new BadRequestException('user-not-found');

    return this.orderRepository.insert(orderData);
  }

  public async listByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.listByUserId(userId);
  }

  public async findByOrderId(id: number): Promise<Order> {
    const order = await this.orderRepository.findByOrderId(id);

    if (!order) throw new NotFoundException('order-not-found');

    return order;
  }
}
