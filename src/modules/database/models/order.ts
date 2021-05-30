import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/order';
import { User } from './user';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id?: number;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'integer' })
  public quantity: number;

  @ApiProperty({ type: 'decimal' })
  public value: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate?: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate?: Date;

  @ApiProperty({})
  public user: User;

  @ApiProperty({})
  public userId: number;

  public static get tableName(): string {
    return 'Order';
  }

  public static get relationMappings(): any {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'Order.userId',
          to: 'User.id'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = new Date();
    this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
