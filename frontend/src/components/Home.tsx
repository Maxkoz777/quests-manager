import { useEffect, useState } from "react";
import { Base } from "./Base";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios, { AxiosError } from "axios";
import { VITE_JSON_SERVER_URL } from "../utils/ApiUtils";
import { Card, CardContent, Grid, Paper, Stack } from "@mui/material";
import { Order } from "../models/Order";
import { Link } from "react-router-dom";
import { TruncatedText } from "./TruncatedText";
import { MapView } from "./MapView";

export const Home = () => {
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const { data } = await axios.get<Order[]>(
          `${VITE_JSON_SERVER_URL}/orders`
        );
        // const { data } = await axios.get<Order[]>(`${API_URL}/orders`, {
        //   headers: {
        //     Authorization: "Bearer please use auth header!! thanks )))",
        //   },
        // });

        data && setOrders(data);
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
        <Grid container spacing={2} sx={{ height: "calc(100vh - 6rem)" }}>
          <Grid item xs={12} md={3}>
            <Stack spacing={2}>
              {orders &&
                orders.map((item, key) => (
                  <Grid item key={key}>
                    <Link
                      to={{ pathname: "/task-detail" }}
                      style={{ textDecoration: "none" }}
                    >
                      <Card key={key}>
                        <CardContent>
                          <TruncatedText text={item.title} />
                          <TruncatedText
                            text={`Description: ${item.description}`}
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              {error && <div>{error}</div>}
            </Stack>
          </Grid>
          <Grid
            item
            xs={0}
            sx={{ display: { xs: "none", md: "block" } }}
            md={9}
          >
            <Paper elevation={3} sx={{ height: "100%" }}>
              <MapView />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Base>
  );
};
