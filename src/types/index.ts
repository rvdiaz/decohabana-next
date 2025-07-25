export interface BookingData {
  from: string;
  to: string;
  date: string;
  time: string;
  selectedCar: Car | null;
  user: User | null;
  payment: Payment | null;
}

export interface Car {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  capacity: number;
  features: string[];
  description: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export interface Payment {
  method: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
}