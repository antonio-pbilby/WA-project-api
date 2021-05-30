import { BadRequestException } from '@nestjs/common';
import { UserRepository } from 'modules/admin/repositories/user';

import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

describe('Orders service', () => {
  let orderRepository: OrderRepository;
  let userRepository: UserRepository;
  let orderService: OrderService;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    userRepository = new UserRepository();
    orderService = new OrderService(orderRepository, userRepository);
  });

  it('Should be able to post a new order', async () => {
    const order = {
      description: 'babydolls',
      quantity: 10,
      value: 500,
      userId: 100,
      createdDate: new Date(),
      updatedDate: new Date(),
      id: 11
    };
    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce({ id: 1 } as any);
    jest.spyOn(orderRepository, 'insert').mockResolvedValueOnce(order as any);

    const orderReturn = await orderService.create({
      description: 'description test',
      quantity: 10,
      value: 500,
      userId: 1
    });

    expect(orderReturn).toHaveProperty('id');
  });

  it('Should not be able to create a new order for a invalid user', async () => {
    try {
      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(false as any);
      const order = await orderService.create({
        description: 'description test',
        quantity: 10,
        value: 500,
        userId: 1
      });
      console.log(order);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message.message).toBe('user-not-found');
    }
  });

  it('Should be able to list all orders by user id', async () => {
    const orders = [
      {
        description: 'babydolls',
        quantity: 10,
        value: 500,
        userId: 2,
        createdDate: new Date(),
        updatedDate: new Date(),
        id: 20
      },
      {
        description: 'dababycar',
        quantity: 5,
        value: 10000,
        userId: 2,
        createdDate: new Date(),
        updatedDate: new Date(),
        id: 15
      }
    ];

    jest.spyOn(orderRepository, 'listByUserId').mockResolvedValueOnce(orders as any);

    const order = await orderService.listByUser(2);

    expect(order).toHaveLength(2);
  });

  it('Should be able to list order by id', async () => {
    const order = {
      description: 'babydolls',
      quantity: 10,
      value: 500,
      userId: 100,
      createdDate: new Date(),
      updatedDate: new Date(),
      id: 11
    };

    jest.spyOn(orderRepository, 'findByOrderId').mockResolvedValueOnce(order as any);

    const orderReturn = await orderService.findByOrderId(11);

    expect(orderReturn).toEqual(order);
  });
});
