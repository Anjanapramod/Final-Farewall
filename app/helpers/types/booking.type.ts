export interface Booking {
  id?: number;  
  price?: number;
  date?: Date;
  status?: string; // PENDING, CONFIRMED, CANCELLED
  createdAt?: Date;
  userId?: number;
  serviceId?: number;
  bookedDate?: Date;
  assertId?: number;
  assetQty?: number; 

  type?: string; // SERVICE, ASSET
  name?: string;

  parlorId?: number;
  
}
