import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { Base } from "../utils/Base";
import axios from "axios";
import { VITE_API_URL } from "../../utils/ApiUtils";
import { OrderCreate } from "../../models/Order";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { MapView } from "../map/MapView";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useState } from "react";
import { Coordinate } from "../../models/Coordinate";

export const NewOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderCreate>();

  const [coordinates, setCoordinates] = useState<Coordinate>();

  const authHeader = useAuthHeader();

  console.log(coordinates?.latitude, coordinates?.longitude);

  const onSubmit: SubmitHandler<OrderCreate> = async ({
    title,
    description,
    cost,
  }) => {
    const payload: OrderCreate = {
      title,
      description,
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
      cost,
      executionDuration: 3600, // in seconds
      executionPeriodStart: new Date(),
      executionPeriodEnd: new Date(Date.now() + 3600 * 1000),
    };

    const response = await toast.promise(
      axios.post(`${VITE_API_URL}/orders`, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }),
      {
        pending: "Creating...",
        success: "Created successfully",
        error: "Error creating new order",
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
                {...register("description", { required: true })}
              />
              {errors.description && <span>This field is required</span>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="cost"
                label="Cost"
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
              Create Order
            </Button>
          </form>
        </Grid>
        <Grid item xs={0} sx={{ display: { xs: "none", md: "block" } }} md={9}>
          <Paper elevation={3} sx={{ height: "100%" }}>
            <MapView
              create={true}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
            />
          </Paper>
        </Grid>
      </Grid>
    </Base>
  );
};
