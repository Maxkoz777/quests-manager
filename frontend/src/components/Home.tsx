import { Base } from "./utils/Base";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Grid, Paper } from "@mui/material";
import { MapView } from "./map/MapView";
import { OrderScrollView } from "./order/OrderScrollView";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../utils/Api";

export const Home = () => {
  const authHeader = useAuthHeader();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchOrders(authHeader),
    queryKey: ["orders"],
    refetchInterval: 10 * 1000, // 10 seconds
  });

  return (
    <Base>
      <Grid container spacing={2} sx={{ height: "calc(100vh - 6rem)" }}>
        <Grid item xs={12} md={3}>
          {
            <OrderScrollView
              orders={orders}
              execute={true}
              isLoading={isLoading}
              error={error}
            />
          }
        </Grid>
        <Grid item xs={0} sx={{ display: { xs: "none", md: "block" } }} md={9}>
          <Paper elevation={3} sx={{ height: "100%" }}>
            <MapView create={false} orders={orders} />
          </Paper>
        </Grid>
      </Grid>
    </Base>
  );
};
