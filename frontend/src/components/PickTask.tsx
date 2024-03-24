import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";
import { VITE_API_URL } from "../utils/ApiUtils";
import { Button } from "@mui/material";

interface Prop {
  taskId: number;
}

export const PickTask = ({ taskId }: Prop) => {
  const authHeader = useAuthHeader();

  const handlePickTask = () => {
    toast.promise(
      axios.post(
        `${VITE_API_URL}/orders/execute/${taskId}`,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      ),
      {
        pending: "...",
        success: "Successfully picked",
        error: "Error picking this task",
      }
    );
  };

  return (
    <Button
      onClick={handlePickTask}
      variant="contained"
      sx={{ marginTop: "1.5rem" }}
    >
      Pick Task
    </Button>
  );
};
