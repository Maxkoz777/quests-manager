import { Stack } from "@mui/material";
import { Order } from "../../models/Order";
import { OrderCard } from "./OrderCard";

interface OrderScrollViewProp {
  orders: Order[] | undefined;
  execute?: boolean;
  confirm?: boolean;
  finish?: boolean;
  isLoading: boolean;
  error?: Error | null;
}

export const OrderScrollView = ({
  orders,
  execute,
  confirm,
  finish,
  isLoading,
  error,
}: OrderScrollViewProp) => {
  if (isLoading) {
    return <>Fetching orders...</>;
  }

  if (orders?.length === 0) {
    return <>No orders available</>;
  }

  if (error) {
    return <>An error occured please reload your browser</>;
  }

  return (
    <Stack
      sx={{
        backgroundColor: "#f1f1f1",
        height: "calc(100vh - 8rem)",
        overflow: "scroll",
        padding: "10px",
      }}
      spacing={2}
    >
      {orders?.map((order, idx) => (
        <OrderCard
          order={order}
          idx={idx}
          key={order.id}
          execute={execute}
          confirm={confirm}
          finish={finish}
        />
      ))}
    </Stack>
  );
};
