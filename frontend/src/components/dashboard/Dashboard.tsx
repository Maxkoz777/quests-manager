import { Base } from "../utils/Base";
import { Grid, Typography } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { OrderScrollView } from "../order/OrderScrollView";
import { useQuery } from "@tanstack/react-query";
import {
  getCreatedOrders,
  getCurrentOrders,
  getTakenOrders,
} from "../../utils/Api";

export const Dashboard = () => {
  const authHeader = useAuthHeader();

  const {
    data: createdOrders,
    isLoading: createdLoading,
    error: createdError,
  } = useQuery({
    queryFn: () => getCreatedOrders(authHeader),
    queryKey: ["createdOrders"],
  });

  const {
    data: currentOrders,
    isLoading: currentLoading,
    error: currentError,
  } = useQuery({
    queryFn: () => getCurrentOrders(authHeader),
    queryKey: ["currentOrders"],
  });

  const {
    data: takenOrders,
    isLoading: takenLoading,
    error: takenError,
  } = useQuery({
    queryFn: () => getTakenOrders(authHeader),
    queryKey: ["takenOrders"],
  });

  return (
    <Base>
      <Grid spacing={1} container>
        <Grid md={3.5} xs={12} item>
          <Title title="Created orders" />
          <OrderScrollView
            isLoading={createdLoading}
            orders={createdOrders}
            confirm={true}
            error={createdError}
          />
        </Grid>
        <Grid md={3.5} xs={12} item>
          <Title title="Current orders" />
          <OrderScrollView
            isLoading={currentLoading}
            orders={currentOrders}
            finish={true}
            error={currentError}
          />
        </Grid>
        <Grid md={3.5} xs={12} item>
          <Title title="Taken orders" />
          <OrderScrollView
            isLoading={takenLoading}
            orders={takenOrders}
            error={takenError}
          />
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
