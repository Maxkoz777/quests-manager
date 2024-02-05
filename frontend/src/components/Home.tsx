import { useEffect, useState } from "react";
import { Base } from "./Base";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios, { AxiosError } from "axios";
import { User } from "../models/User";

export const Home = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<User>();
  const authHeader = useAuthHeader();

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const { data } = await axios.get<User>(
          "https://dummyjson.com/auth/me",
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );

        setUser({ ...data });
      };

      fetchUser();
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setError(err.message);
      }

      console.error("Error: ", err);
    }
  }, [authHeader]);

  return (
    <Base>
      <>
        <h1>Hello there! {`${user ? user.username : "Stranger!"}`}</h1>
        {error && <div>{error}</div>}
      </>
    </Base>
  );
};
