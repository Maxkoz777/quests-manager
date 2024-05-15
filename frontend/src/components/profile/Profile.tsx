import { Base } from "../utils/Base";
import { useEffect, useState } from "react";
import { VITE_PAYMENT_API_URL } from "../../utils/ApiUtils";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Box, Button, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface AmountModel {
  amount: number;
}

export const Profile = () => {
  const authHeader = useAuthHeader();
  const [amount, setAmount] = useState<number>();
  const [reloadTrigger, setReloadTrigger] = useState<number>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AmountModel>();

  useEffect(() => {
    axios
      .get(`${VITE_PAYMENT_API_URL}/payments`, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((res) => setAmount(res.data))
      .catch((err) => console.error("Error occured: ", err.message));
  }, [authHeader, reloadTrigger]);

  const onSubmit: SubmitHandler<AmountModel> = async ({ amount }) => {
    const payload: AmountModel = { amount };

    const response = await toast.promise(
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

    if (response.status === 200) {
      reset();
      setReloadTrigger(Math.random());
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
