import { Box, Button, Container, TextField } from "@mui/material";
import { Base } from "./Base";
import axios from "axios";
import { VITE_JSON_SERVER_URL } from "../utils/ApiUtils";
import { Order } from "../models/Order";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export const NewTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Order>();

  const onSubmit: SubmitHandler<Order> = async (data) => {
    const response = await toast.promise(
      axios.post<Order>(
        `${VITE_JSON_SERVER_URL}/orders`,
        JSON.stringify({
          title: data.title,
          description: data.description,
          cost: data.cost,
        }),
        {
          headers: { "Content-Type": "application/json" },
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
      <Container maxWidth="xs">
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
      </Container>
    </Base>
  );
};
