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

        console.log("Error loggin in user");
      } else if (error instanceof Error) {
        console.error("An Error occured");
      }
    }
  };

  return (
    <div className="flex flex-col text-xl *:my-3">
      <div className="flex flex-col w-full">
        <label htmlFor="username" className="text-sm">
          Username
        </label>
        <input
          required
          id="username"
          name="username"
          value={username}
          className="text-sm p-1"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          required
          id="password"
          name="password"
          type="password"
          value={password}
          className="text-sm p-1"
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      {loginError && (
        <span className="text-red-500">{loginError?.error_description}</span>
      )}

      <button
        onClick={handleLogin}
        className="bg-red-500 text-white text-xl border-none py-1 active:bg-red-600 hover:bg-red-600 w-full rounded-lg shadow-lg hover:shadow-xl"
      >
        Login
      </button>
      <div className="text-sm flex flex-col items-end">
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
};
