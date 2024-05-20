import { Base } from "../utils/Base";
import { VITE_PAYMENT_API_URL } from "../../utils/ApiUtils";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Box, Button, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAmount } from "../../utils/Api";

interface AmountModel {
  amount: number;
}

export const Profile = () => {
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AmountModel>();

  const onSubmit: SubmitHandler<AmountModel> = async ({ amount }) => {
    const payload: AmountModel = { amount };

    return await toast.promise(
      axios.post<AmountModel>(
        `${VITE_PAYMENT_API_URL}/payments`,
        JSON.stringify(payload),
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      ),
      {
        pending: "Adding...",
        success: "Amount successfully added!",
        error: "Error adding amount",
      }
    );
  };

  const { data: amount } = useQuery({
    queryFn: () => getAmount(authHeader),
    queryKey: ["amount"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: handleSubmit(onSubmit),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["amount"],
      });
    },
  });

  return (
    <Base>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography variant="h2">Balance: {amount}</Typography>
        </Box>
        <Box sx={{ mt: 1, width: { xs: "100%", md: "50%" } }}>
          <form onSubmit={mutateAsync}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              autoFocus
              {...register("amount", { required: true })}
            />
            {errors.amount && <span>This field is required</span>}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Add money
            </Button>
          </form>
        </Box>
      </Box>
    </Base>
  );
};
