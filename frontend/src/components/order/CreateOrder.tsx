import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
import dayjs, { Dayjs } from "dayjs";
import { useUserCoordinates } from "../../hooks/useUserCoordinates";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CreateOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderCreate>();
  const userCoordinates = useUserCoordinates();
  const [startValue, setStartValue] = useState<Dayjs | null>();
  const [endValue, setEndValue] = useState<Dayjs | null>();
  const [locationPicked, setLocationPicked] = useState<boolean>(false);

  const [coordinates, setCoordinates] = useState<Coordinate>();

  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<OrderCreate> = async ({
    title,
    description,
    cost,
  }) => {
    if (!coordinates) {
      userCoordinates &&
        setCoordinates({
          latitude: userCoordinates?.latitude,
          longitude: userCoordinates?.longitude,
        });
    }

    const payload: OrderCreate = {
      title,
      description,
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
      cost,
      executionDuration: endValue?.diff(startValue, "second") ?? 3600, // in seconds
      executionPeriodStart: startValue?.toDate() ?? new Date(Date.now()),
      executionPeriodEnd:
        endValue?.toDate() ?? new Date(Date.now() + 3600 * 1000),
    };

    return await toast.promise(
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
  };

  const { mutateAsync } = useMutation({
    mutationFn: handleSubmit(onSubmit),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["createdOrders"],
      });
    },
  });

  return (
    <Base>
      <Grid container spacing={2} sx={{ height: "calc(100vh - 6rem)" }}>
        <Grid item xs={12} md={3}>
          <form onSubmit={mutateAsync}>
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
              <DateTimePicker
                sx={{ mt: "1rem" }}
                label="Execution Period Start"
                name="executionPeriodStart"
                views={["year", "day", "hours", "minutes"]}
                defaultValue={dayjs(new Date(Date.now()))}
                value={startValue}
                onChange={(newValue) => setStartValue(newValue)}
              />
              <DateTimePicker
                sx={{ mt: "1rem" }}
                label="Execution Period End"
                name="executionPeriodEnd"
                views={["year", "day", "hours", "minutes"]}
                defaultValue={dayjs(new Date(Date.now() + 3600 * 1000))}
                value={endValue}
                onChange={(newValue) => setEndValue(newValue)}
              />
            </Box>
            {locationPicked && (
              <Box sx={{ color: "#ff00ff", mt: "1rem" }}>Location picked</Box>
            )}
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
              setLocationPicked={setLocationPicked}
            />
          </Paper>
        </Grid>
      </Grid>
    </Base>
  );
};
