import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Base } from "./Base";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios, { AxiosError } from "axios";
import { Card, CardContent, Grid, Paper, Stack } from "@mui/material";
import { Order } from "../models/Order";
import { VITE_API_URL } from "../utils/ApiUtils";
import { MapView } from "./MapView";
import { TruncatedText } from "./TruncatedText";

export const Home = () => {
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const { data } = await axios.get<Order[]>(`${VITE_API_URL}/orders`, {
          headers: {
            Authorization: authHeader,
          },
        });

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
            <Stack
              sx={{
                backgroundColor: "#f1f1f1",
                height: "calc(100vh - 8rem)",
                overflow: "scroll",
                padding: "10px",
              }}
              spacing={2}
            >
              {orders &&
                orders.map((order, idx) => (
                  <TaskCard order={order} idx={idx} key={idx} />
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

interface TaskCardProp {
  order: Order;
  idx: number;
}

const TaskCard = ({ order, idx }: TaskCardProp) => {
  return (
    <Grid item key={idx}>
      <Link
        to={{ pathname: `/task-detail/${order.id}` }}
        style={{ textDecoration: "none" }}
      >
        <Card key={idx}>
          <CardContent>
            <TruncatedText text={order.title} />
            <TruncatedText text={`Description: ${order.description}`} />
            <TruncatedText text={`Cost: ${order.cost}`} />
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};
