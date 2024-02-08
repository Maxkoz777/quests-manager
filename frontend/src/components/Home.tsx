import { useEffect, useState } from "react";
import { Base } from "./Base";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios, { AxiosError } from "axios";
import { API_URL } from "../utils/ApiUtils";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TodoItems } from "../models/TodoItems";

export const Home = () => {
  const [error, setError] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItems>();
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();

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

  /**
   * Truncate text such that all cards will have same max length of texts
   */

  return (
    <Base>
      {loading ? (
        "Loading..."
      ) : (
        <Grid
          sx={{ height: "100%", display: "flex" }}
          container
          direction="row"
          alignItems="stretch"
          spacing={2}
        >
          {todoItems &&
            todoItems.todos.map((item, key) => (
              <Grid flex={"1"} item xs={12} sm={6} md={3} key={key}>
                <Card key={key}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.todo}
                    </Typography>
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          {error && <div>{error}</div>}
        </Grid>
      )}
    </Base>
  );
};
