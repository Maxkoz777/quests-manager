import { Base } from "./Base";
import { Grid, Paper } from "@mui/material";

export const Home = () => {
  return (
    <Base>
      {
        <Grid container spacing={2} sx={{ height: "calc(100vh - 6rem)" }}>
          <Grid item xs={12} md={3}></Grid>
          <Grid
            item
            xs={0}
            sx={{ display: { xs: "none", md: "block" } }}
            md={9}
          >
            <Paper elevation={3} sx={{ height: "100%" }}></Paper>
          </Grid>
        </Grid>
      }
    </Base>
  );
};
