import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";
import { VITE_API_URL } from "../../utils/ApiUtils";
import { Button } from "@mui/material";

interface Props {
  orderId: number;
  setCompletedStatus?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FinishExecution = ({ orderId, setCompletedStatus }: Props) => {
  const authHeader = useAuthHeader();

  const handleCompleteOrder = async () => {
    const result = await toast.promise(
      axios.post(
        `${VITE_API_URL}/orders/execution/finish/${orderId}`,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),
      {
        pending: "...",
        success: "Successfully completed",
        error: "Error marking this order as complete",
      }
    );

    if (result.status === 200) {
      setCompletedStatus && setCompletedStatus(true);
    }
  };

  return (
    <Button
      onClick={handleCompleteOrder}
      variant="contained"
      sx={{ marginTop: "1.5rem" }}
    >
      Complete Order
    </Button>
  );
};
