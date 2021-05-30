import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { Order } from 'modules/database/models/order';

import { OrderService } from '../services/order';
import { SaveValidator } from '../validators/save';

@ApiTags('Order')
@Controller('/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @AuthRequired([enRoles.user])
  @ApiResponse({ status: 201, type: Order })
  public async save(@Body() orderData: SaveValidator) {
    return this.orderService.create(orderData);
  }

  @Get('/user/:userId')
  @AuthRequired([enRoles.user])
  @ApiResponse({ status: 200, type: Order })
  public async listByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.listByUser(userId);
  }

  @Get(':id')
  @AuthRequired([enRoles.user])
  @ApiResponse({ status: 200, type: Order })
  public async findByOrderId(@Param('id', ParseIntPipe) userId: number) {
    return this.orderService.findByOrderId(userId);
  }
}
