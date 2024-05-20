import { Box, Grid, Paper, SxProps, Theme, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { MapView } from "../map/MapView";
import { ExecuteOrder } from "./ExecuteOrder";
import { FinishExecution } from "./FinishExecution";
import prettyMilliseconds from "pretty-ms";
import { useQuery } from "@tanstack/react-query";
import { Base } from "../utils/Base";
import { getOrder } from "../../utils/Api";

export const OrderDetail = () => {
  const params = useParams();
  const authHeader = useAuthHeader();

  const id = Number(params.id);

  const {
    data: orderDetail,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getOrder(id, authHeader),
    queryKey: ["orderDetail"],
  });

  if (error) {
    return <Base>An error occured please reload your browser</Base>;
  }

  return (
    <Base>
      <Grid container spacing={2} sx={{ height: "calc(100vh - 6rem)" }}>
        <Grid item xs={12} md={3}>
          {isLoading ? (
            <>Loading...</>
          ) : (
            orderDetail && (
              <>
                <Row
                  title="Title"
                  content={orderDetail.title}
                  sx={{}}
                  widthSx={{ width: "120px" }}
                />
                <Row
                  title="Description"
                  content={orderDetail.description}
                  sx={{}}
                  widthSx={{ width: "120px" }}
                />
                <Row
                  title="Cost"
                  content={`${orderDetail.cost}`}
                  sx={{}}
                  widthSx={{ width: "120px" }}
                />
                <Row
                  title="Duration"
                  content={prettyMilliseconds(
                    orderDetail?.executionDuration * 1000,
                    {
                      verbose: true,
                    }
                  )}
                  sx={{}}
                  widthSx={{ width: "120px" }}
                />
                <Row
                  title="Status"
                  content={orderDetail.orderStatus}
                  sx={{}}
                  widthSx={{ width: "120px" }}
                />
                <Row
                  title="Created at"
                  content={new Date(
                    orderDetail?.createdOn.toLocaleString()
                  ).toLocaleString()}
                  sx={{}}
                  widthSx={{ width: "120px" }}
                />
                {orderDetail.executionStartTime && (
                  <Row
                    title="Picked at"
                    content={new Date(
                      orderDetail?.executionStartTime.toLocaleString()
                    ).toLocaleString()}
                    sx={{}}
                    widthSx={{ width: "120px" }}
                  />
                )}
                {orderDetail.executionFinishTime && (
                  <Row
                    title="Completed at"
                    content={new Date(
                      orderDetail?.executionFinishTime.toLocaleString()
                    ).toLocaleString()}
                    sx={{}}
                    widthSx={{ width: "120px" }}
                  />
                )}
                <Box sx={{ gap: "1rem", display: "flex" }}>
                  <ExecuteOrder orderId={id} />
                  <FinishExecution orderId={id} />
                </Box>
              </>
            )
          )}
        </Grid>

        <Grid item xs={0} sx={{ display: { xs: "none", md: "block" } }} md={9}>
          <Paper elevation={3} sx={{ height: "100%" }}>
            {orderDetail && <MapView create={false} orders={[orderDetail]} />}
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
