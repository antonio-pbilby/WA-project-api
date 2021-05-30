export interface IOrder {
  id?: number;
  description: string;
  quantity: number;
  value: number;
  userId: number;
  createdDate?: Date;
  updatedDate?: Date;
}
