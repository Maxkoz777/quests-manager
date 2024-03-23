import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { VITE_AUTH_REGISTER_URL } from "../utils/ApiUtils";
import { Base } from "./Base";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface RegisterModel {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterModel>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterModel> = async ({
    firstName,
    lastName,
    username,
    email,
    password,
  }) => {
    const response = await toast.promise(
      axios.post<RegisterModel>(
        VITE_AUTH_REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      ),
      {
        pending: "Registering...",
        success: "User successfully registered!",
        error: "Error registering new user",
      }
    );

    console.log(response.status);

    if (response.status === 204) {
      reset();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <Base>
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 1, width: "100%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                {...register("username", { required: true })}
              />
              {errors.username && <span>This field is required</span>}
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Login</Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </Base>
  );
};
