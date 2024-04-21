import { Grid, Card, CardContent, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Order } from "../../models/Order";
import { TruncatedText } from "../utils/TruncatedText";
import { ExecuteOrder } from "./ExecuteOrder";
import { FinishExecution } from "./FinishExecution";
import { ConfirmExecution } from "./ConfirmExecution";

interface OrderCardProp {
  order: Order;
  idx: number;
  execute?: boolean;
  confirm?: boolean;
  finish?: boolean;
}

export const OrderCard = ({
  order,
  idx,
  execute,
  confirm,
  finish,
}: OrderCardProp) => {
  return (
    <Grid item key={idx}>
      <Card key={idx}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", padding: "10px" }}
        >
          <Link
            to={{ pathname: `/order-detail/${order.id}` }}
            style={{ textDecoration: "none" }}
          >
            <Paper elevation={2} sx={{ padding: "10px" }}>
              <TruncatedText text={order.title} />
              <TruncatedText text={`Description: ${order.description}`} />
              <TruncatedText text={`Cost: ${order.cost}`} />
            </Paper>
          </Link>
          <Box sx={{ alignSelf: "flex-end" }}>
            {execute && <ExecuteOrder orderId={order.id} />}
            {confirm && <ConfirmExecution orderId={order.id} />}
            {finish && <FinishExecution orderId={order.id} />}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
