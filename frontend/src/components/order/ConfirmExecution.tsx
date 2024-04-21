import { Button } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { VITE_API_URL } from "../../utils/ApiUtils";
import { toast } from "react-toastify";
import axios from "axios";

interface ConfirmExecutionProps {
  orderId: number;
  setPickStatus?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmExecution = ({
  orderId,
  setPickStatus,
}: ConfirmExecutionProps) => {
  const authHeader = useAuthHeader();

  const handleConfirmOrder = async () => {
    const result = await toast.promise(
      axios.post(
        `${VITE_API_URL}/orders/execution/validate/${orderId}`,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),
      {
        pending: "...",
        success: "Execution confirmed",
        error: "Error confirming this order",
      }
    );

    if (result.status === 200) {
      setPickStatus && setPickStatus(true);
    }
  };

  return (
    <Button
      onClick={handleConfirmOrder}
      variant="contained"
      sx={{ marginTop: "1.5rem" }}
    >
      Confirm Execution
    </Button>
  );
};
