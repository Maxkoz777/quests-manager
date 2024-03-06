import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API_URL } from "../utils/ApiUtils";
import axios, { AxiosError } from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { User } from "../models/User";
import { Base } from "./Base";

interface Prop {
  token: string;
}

export const Login = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState(true);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post<Prop>(
        `${AUTH_API_URL}/auth/login`,
        JSON.stringify({ username: user, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token } = response.data;

      const success = signIn<User>({
        auth: {
          token: token,
          type: "Bearer",
        },
        userState: {
          user: user,
        },
        expiresIn: 2, //minutes,
      });

      setLoginSuccess(success);
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setError(err.message);
      }

      console.error("Error: ", err);
    }

    if (loginSuccess) {
      navigate("/");
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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {loginSuccess ? "" : "Invalid username or password"}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Base>
  );
};
