export interface Order {
  id?: number;
  title: string;
  description: string;
  cost: number;
  orderStatus?: string;
}
