import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class SaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  @ApiProperty({ required: true, type: 'string', minLength: 5, maxLength: 150 })
  public description: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer', minimum: 1 })
  public quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ required: true, type: 'number', minimum: 0 })
  public value: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'integer' })
  public userId: number;
}
