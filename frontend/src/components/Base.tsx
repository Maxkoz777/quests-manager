import { ReactElement, ReactNode } from "react";
import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { MyNavBar } from "./MyNavBar";

interface Prop {
  children: ReactNode | ReactElement;
}

export const Base = ({ children }: Prop) => {
  return (
    <Box>
      <Container maxWidth="xl" className="mt-3">
        <CssBaseline />
        <MyNavBar />
        <Toolbar sx={{ marginBottom: "2rem" }} />
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};
