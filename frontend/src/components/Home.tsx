import { useEffect, useState } from "react";
import { Base } from "./Base";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios, { AxiosError } from "axios";
import { API_URL } from "../utils/ApiUtils";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TodoItems } from "../models/TodoItems";
import { Address } from "../models/Addresses";
import { Link } from "react-router-dom";
import { TruncatedText } from "./TruncatedText";

export const Home = () => {
  const [error, setError] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItems>();
  const [address, setAddress] = useState<Address[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();

  useEffect(() => {
    try {
      const fetchAddress = async () => {
        const { data } = await axios.get<Address[]>(
          "https://random-data-api.com/api/v2/addresses?size=30"
        );

        data && setAddress(data);

        setLoading(false);
      };

      fetchAddress();
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setError(err.message);
      }

      console.error("Error: ", err);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const { data } = await axios.get<TodoItems>(`${API_URL}/todos`, {
          headers: {
            Authorization: authHeader,
          },
        });

        data && setTodoItems(data);
        setLoading(false);
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
      {loading ? (
        "Loading..."
      ) : (
        <Grid container spacing={2}>
          {todoItems &&
            todoItems.todos.map((item, key) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Link
                  to={{ pathname: "/task-detail" }}
                  style={{ textDecoration: "none" }}
                >
                  <Card key={key}>
                    <CardContent>
                      <TruncatedText text={item.todo} />
                      <Typography variant="h6" component="div">
                        Status:{" "}
                        <span
                          style={{
                            color: `${item.completed ? "green" : "red"}`,
                          }}
                        >
                          {item.completed.toString()}
                        </span>
                      </Typography>
                      <TruncatedText
                        text={`Address: ${
                          address && address[key].full_address
                        }`}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          {error && <div>{error}</div>}
        </Grid>
      )}
    </Base>
  );
};
