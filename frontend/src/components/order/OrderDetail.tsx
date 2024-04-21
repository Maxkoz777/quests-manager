import { Box, Grid, Paper, SxProps, Theme, Typography } from "@mui/material";
import { Base } from "../utils/Base";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Order } from "../../models/Order";
import { VITE_API_URL } from "../../utils/ApiUtils";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { MapView } from "../map/MapView";
import { ExecuteOrder } from "./ExecuteOrder";
import { FinishExecution } from "./FinishExecution";
import prettyMilliseconds from "pretty-ms";

export const OrderDetail = () => {
  const [order, setOrder] = useState<Order>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [pickedStatus, setPickStatus] = useState<boolean>(false);
  const [completedStatus, setCompletedStatus] = useState<boolean>(false);
  const params = useParams();
  const authHeader = useAuthHeader();

  const id = Number(params.id);

  useEffect(() => {
    axios
      .get<Order>(`${VITE_API_URL}/orders/${id}`, {
        headers: { Authorization: authHeader },
      })
      .then((res: AxiosResponse) => {
        setOrder(res.data);
        setOrders([res.data]);
      })
      .catch((err) => {
        if (err && err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else if (err && err instanceof Error) {
          console.log(err.message);
        }
      });
  }, [
    authHeader,
    id,
    order?.executionStartTime,
    pickedStatus,
    completedStatus,
  ]);

  return (
    <Base>
      <Grid container spacing={2} sx={{ height: "calc(100vh - 6rem)" }}>
        <Grid item xs={12} md={3}>
          {order && (
            <>
              <Row
                title="Title"
                content={order.title}
                sx={{}}
                widthSx={{ width: "120px" }}
              />
              <Row
                title="Description"
                content={order.description}
                sx={{}}
                widthSx={{ width: "120px" }}
              />
              <Row
                title="Cost"
                content={`${order.cost}`}
                sx={{}}
                widthSx={{ width: "120px" }}
              />
              <Row
                title="Duration"
                content={prettyMilliseconds(order?.executionDuration * 1000, {
                  verbose: true,
                })}
                sx={{}}
                widthSx={{ width: "120px" }}
              />
              <Row
                title="Status"
                content={order.orderStatus}
                sx={{}}
                widthSx={{ width: "120px" }}
              />
              <Row
                title="Created at"
                content={new Date(
                  order?.createdOn.toLocaleString()
                ).toLocaleString()}
                sx={{}}
                widthSx={{ width: "120px" }}
              />
              {order.executionStartTime && (
                <Row
                  title="Picked at"
                  content={new Date(
                    order?.executionStartTime.toLocaleString()
                  ).toLocaleString()}
                  sx={{}}
                  widthSx={{ width: "120px" }}
                />
              )}
              {order.executionFinishTime && (
                <Row
                  title="Completed at"
                  content={new Date(
                    order?.executionFinishTime.toLocaleString()
                  ).toLocaleString()}
                  sx={{}}
                  widthSx={{ width: "120px" }}
                />
              )}
              <Box sx={{ gap: "1rem", display: "flex" }}>
                <ExecuteOrder orderId={id} setPickStatus={setPickStatus} />
                <FinishExecution
                  orderId={id}
                  setCompletedStatus={setCompletedStatus}
                />
              </Box>
            </>
          )}
        </Grid>

        <Grid item xs={0} sx={{ display: { xs: "none", md: "block" } }} md={9}>
          <Paper elevation={3} sx={{ height: "100%" }}>
            <MapView
              create={false}
              orders={orders}
              order={order}
              preferOrderCoordinate={true}
            />
          </Paper>
        </Grid>
      </Grid>
    </Base>
  );
};

interface RowProps {
  title: string | undefined;
  content: string | undefined;
  sx: SxProps<Theme> | undefined;
  widthSx: SxProps<Theme> | undefined;
}

const Row = ({ title, widthSx, sx, content }: RowProps) => {
  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item sx={{ ...widthSx }}>
          <Typography sx={{ ...sx }}>{title}</Typography>
        </Grid>
        <Grid item xs>
          <Typography sx={{ fontWeight: "bold", ...sx }}>{content}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
