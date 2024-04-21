import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";
import { VITE_API_URL } from "../../utils/ApiUtils";
import { Button } from "@mui/material";

interface Props {
  orderId: number;
  setPickStatus?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ExecuteOrder = ({ orderId, setPickStatus }: Props) => {
  const authHeader = useAuthHeader();

  const handlePickOrder = async () => {
    const result = await toast.promise(
      axios.post(
        `${VITE_API_URL}/orders/execution/start/${orderId}`,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),
      {
        pending: "...",
        success: "Successfully taken",
        error: "Error taking this order",
      }
    );

    if (result.status === 200) {
      setPickStatus && setPickStatus(true);
    }
  };

  return (
    <Button
      onClick={handlePickOrder}
      variant="contained"
      sx={{ marginTop: "1.5rem" }}
    >
      Take Order
    </Button>
  );
};
