import { Order } from "../../models/Order";
import { OrderCard } from "./OrderCard";

interface OrderScrollViewProp {
  orders: Order[] | undefined;
  execute?: boolean;
  confirm?: boolean;
  finish?: boolean;
  isLoading: boolean;
  error?: Error | null;
  className?: string;
}

export const OrderScrollView = ({
  orders,
  execute,
  confirm,
  finish,
  isLoading,
  error,
  className,
}: OrderScrollViewProp) => {
  return (
    <div className={`p-3 flex flex-col gap-2 ${className}`}>
      {isLoading && <>Fetching orders...</>}
      {orders?.length === 0 && <>No orders available</>}
      {error && <>An error occured please reload your browser</>}
      {orders?.map((order) => (
        <OrderCard
          order={order}
          key={order.id}
          execute={execute}
          confirm={confirm}
          finish={finish}
        />
      ))}
    </div>
  );
};
