export interface Booking {
  id?: number;
  price?: number;
  date?: Date;
  status?: string;
  createdAt?: Date;
  userId?: number;
  serviceId?: number;
  bookedDate?: Date;
  assertId?: number;
  assetQty?: number;
}
