import { useEffect, useState } from "react";
import { Base } from "./utils/Base";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios, { AxiosError } from "axios";
import { Grid, Paper } from "@mui/material";
import { Order } from "../models/Order";
import { VITE_API_URL } from "../utils/ApiUtils";
import { MapView } from "./map/MapView";
import { OrderScrollView } from "./order/OrderScrollView";

export const Home = () => {
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const { data } = await axios.get<Order[]>(
          `${VITE_API_URL}/orders/available`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );

        data && setOrders(data);
        setLoading(false);
      };

      fetchUser();
    } catch (err) {
      if (err && err instanceof AxiosError) {
        console.error("Axios error: ", err.message);
      } else if (err && err instanceof Error) {
        console.error("Error:", err.message);
      }
    }
  }, [authHeader]);

  return (
    <Base>
      {loading ? (
        "Loading..."
      ) : (
        <Grid container spacing={2} sx={{ height: "calc(100vh - 6rem)" }}>
          <Grid item xs={12} md={3}>
            <OrderScrollView orders={orders} execute={true} />
          </Grid>
          <Grid
            item
            xs={0}
            sx={{ display: { xs: "none", md: "block" } }}
            md={9}
          >
            <Paper elevation={3} sx={{ height: "100%" }}>
              <MapView create={false} orders={orders} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Base>
  );
};
