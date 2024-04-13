export interface Order {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  cost: number;
  orderStatus?: string;
  creatorId: string;
  executorId: string;
  createdOn: Date;
  executionStartTime?: Date;
  executionFinishTime?: Date;
}

export interface OrderCreate {
  title: string;
  description: string;
  latitude?: number;
  longitude?: number;
  cost: number;
  executionDuration: number;
  executionPeriodStart: Date;
  executionPeriodEnd: Date;
}
