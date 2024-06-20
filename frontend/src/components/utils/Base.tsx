import { ReactElement, ReactNode } from "react";
import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { NavBar } from "./NavBar";

interface Prop {
  children: ReactNode | ReactElement;
}

export const Base = ({ children }: Prop) => {
  return (
    <Container className="mt-3">
      <CssBaseline />
      <NavBar />
      <Toolbar sx={{ marginBottom: "2rem" }} />
      <Box>{children}</Box>
    </Container>
  );
};
