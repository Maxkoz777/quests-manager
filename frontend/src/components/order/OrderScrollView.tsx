import { Stack } from "@mui/material";
import { Order } from "../../models/Order";
import { OrderCard } from "./OrderCard";

interface OrderScrollViewProp {
  orders: Order[] | undefined;
  execute?: boolean;
  confirm?: boolean;
  finish?: boolean;
}

export const OrderScrollView = ({
  orders,
  execute,
  confirm,
  finish,
}: OrderScrollViewProp) => {
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
      {orders &&
        orders.map((order, idx) => (
          <OrderCard
            order={order}
            idx={idx}
            key={idx}
            execute={execute}
            confirm={confirm}
            finish={finish}
          />
        ))}
    </Stack>
  );
};
