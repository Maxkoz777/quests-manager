export interface Order {
  id: 0;
  title: string;
  description: string;
  cost: number;
  orderStatus?: string;
  creatorId: string;
  executorId: string;
  createdOn: Date;
  executionStartTime?: Date;
  executionFinishTime?: Date;
}
