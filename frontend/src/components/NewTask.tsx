import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { Base } from "./Base";
import axios from "axios";
import { VITE_API_URL } from "../utils/ApiUtils";
import { Order } from "../models/Order";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { MapView } from "./MapView";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const NewTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Order>();

  const authHeader = useAuthHeader();

  const onSubmit: SubmitHandler<Order> = async ({
    title,
    description,
    cost,
  }) => {
    const response = await toast.promise(
      axios.post<Order>(
        `${VITE_API_URL}/orders`,
        JSON.stringify({
          title,
          description,
          cost,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      ),
      {
        pending: "Creating...",
        success: "Created successfully",
        error: "Error creating new task",
      }
    );

    if (response.status === 201) {
      reset();
    }
  };

  return (
    <Base>
      <Grid container spacing={2} sx={{ height: "calc(100vh - 6rem)" }}>
        <Grid item xs={12} md={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                autoFocus
                {...register("description", { required: true })}
              />
              {errors.description && <span>This field is required</span>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="cost"
                label="Cost"
                autoFocus
                type="number"
                {...register("cost", { required: true })}
              />
              {errors.cost && <span>This field is required</span>}
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Create Task
            </Button>
          </form>
        </Grid>
        <Grid item xs={0} sx={{ display: { xs: "none", md: "block" } }} md={9}>
          <Paper elevation={3} sx={{ height: "100%" }}>
            <MapView create={true} />
          </Paper>
        </Grid>
      </Grid>
    </Base>
  );
};
