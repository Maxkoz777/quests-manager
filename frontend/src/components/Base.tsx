import { ReactElement, ReactNode } from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { MyNavBar } from "./MyNavBar";

interface Prop {
  children: ReactNode | ReactElement;
}

export const Base = ({ children }: Prop) => {
  return (
    <Box>
      <Container maxWidth="xl" className="mt-3">
        <MyNavBar />
        <Toolbar sx={{ marginBottom: "1rem" }} />
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};
