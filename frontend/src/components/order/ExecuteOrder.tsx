import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePickOrder } from "../../utils/Api";

interface Props {
  orderId: number;
}

export const ExecuteOrder = ({ orderId }: Props) => {
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => handlePickOrder(orderId, authHeader),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "currentOrders", "takenOrders", "orderDetail"],
      });
    },
  });

  return (
    <Button
      onClick={() => mutateAsync()}
      variant="contained"
      sx={{ marginTop: "1.5rem" }}
    >
      Take Order
    </Button>
  );
};
