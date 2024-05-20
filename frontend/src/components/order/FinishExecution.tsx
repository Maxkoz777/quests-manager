import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCompleteOrder } from "../../utils/Api";

interface Props {
  orderId: number;
}

export const FinishExecution = ({ orderId }: Props) => {
  const authHeader = useAuthHeader();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => handleCompleteOrder(orderId, authHeader),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentOrders", "takenOrders", "orderDetail"],
      });
    },
  });

  return (
    <Button
      onClick={() => mutateAsync()}
      variant="contained"
      sx={{ marginTop: "1.5rem" }}
    >
      Complete Order
    </Button>
  );
};
