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
import {
  VITE_AUTH_LOGIN_URL,
  VITE_AUTH_GRANT_TYPE,
  VITE_AUTH_CLIENT_ID,
  VITE_AUTH_CLIENT_SECRET,
} from "../../utils/ApiUtils";
import axios, { AxiosResponse } from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { User } from "../../models/User";
import { Base } from "../utils/Base";

interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  token_type: string;
  status: number;
}

interface LoginError {
  error: string;
  error_description: string;
}

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<LoginError>();
  const signIn = useSignIn<User>();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        VITE_AUTH_LOGIN_URL,
        `username=${username}&password=${password}&grant_type=${VITE_AUTH_GRANT_TYPE}&client_id=${VITE_AUTH_CLIENT_ID}&client_secret=${VITE_AUTH_CLIENT_SECRET}`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const loginResponse: LoginResponse = response.data;

      const success = signIn({
        auth: {
          token: loginResponse.access_token,
          type: loginResponse.token_type,
        },
        userState: {
          username,
        },
      });

      if (success) {
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoginError(error.response?.data);

        console.error("Axios error:", error.message);
      } else if (error instanceof Error) {
        console.error("General error:", error.message);
      }
    }
  };

  return (
    <Base>
      <Container maxWidth="xs">
        <Box
          sx={{
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

            {loginError && (
              <Typography sx={{ color: "#ff0000" }}>
                {loginError?.error_description}
              </Typography>
            )}

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
