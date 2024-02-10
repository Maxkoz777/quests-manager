import { Box, Typography } from "@mui/material";
import { Base } from "./Base";

export const TaskDetail = () => {
  return (
    <Base>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>
          Page with task details and map with location and everything
        </Typography>
      </Box>
    </Base>
  );
};
