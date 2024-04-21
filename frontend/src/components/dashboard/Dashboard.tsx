import { useEffect, useState } from "react";
import { Base } from "../utils/Base";
import axios from "axios";
import { Order } from "../../models/Order";
import { VITE_API_URL } from "../../utils/ApiUtils";
import { Grid, Typography } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { OrderScrollView } from "../order/OrderScrollView";

export const Dashboard = () => {
  const [createdOrders, setCreatedOrders] = useState<Order[]>();
  const [currentOrders, setCurrentOrders] = useState<Order[]>();
  const [takenOrders, setTakenOrders] = useState<Order[]>();
  const authHeader = useAuthHeader();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/orders/created`, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((res) => setCreatedOrders(res.data))
      .catch((err) => console.error("Error occured: ", err.message));
  }, [authHeader]);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/orders/current`, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((res) => setCurrentOrders(res.data))
      .catch((err) => console.error("Error occured: ", err.message));
  }, [authHeader]);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/orders/taken`, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((res) => setTakenOrders(res.data))
      .catch((err) => console.error("Error occured: ", err.message));
  }, [authHeader]);

  return (
    <Base>
      <Grid spacing={1} container>
        <Grid md={3.5} xs={12} item>
          <Title title="Created orders" />
          <OrderScrollView orders={createdOrders} confirm={true} />
        </Grid>
        <Grid md={3.5} xs={12} item>
          <Title title="Current orders" />
          <OrderScrollView orders={currentOrders} finish={true} />
        </Grid>
        <Grid md={3.5} xs={12} item>
          <Title title="Taken orders" />
          <OrderScrollView orders={takenOrders} />
        </Grid>
      </Grid>
    </Base>
  );
};

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return <Typography variant="h5">{title}</Typography>;
};
