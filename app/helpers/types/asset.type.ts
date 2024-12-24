export interface Asset {
  id?: number;

  name: string;
  description: string;

  rate: number;
  quantity: number;
  createdAt?: Date;

  funeralParlorId?: number;
}
