import { Button } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleConfirmOrder } from "../../utils/Api";

interface ConfirmExecutionProps {
  orderId: number;
  setPickStatus?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmExecution = ({
  orderId,
  setPickStatus,
}: ConfirmExecutionProps) => {
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => handleConfirmOrder(orderId, authHeader),
    onSuccess: () => {
      setPickStatus && setPickStatus(true);
      queryClient.invalidateQueries({
        queryKey: ["createdOrders"],
      });
    },
  });

  return (
    <Button
      onClick={() => mutateAsync()}
      variant="contained"
      sx={{ marginTop: "1.5rem" }}
    >
      Confirm Execution
    </Button>
  );
};
