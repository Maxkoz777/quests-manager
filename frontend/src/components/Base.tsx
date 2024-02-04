import { ReactElement, ReactNode } from "react";
import { Container, Toolbar } from "@mui/material";
import { MyNavBar } from "./MyNavBar";

interface Prop {
  children: ReactNode | ReactElement;
}

export const Base = ({ children }: Prop) => {
  return (
    <main className="base">
      <Container maxWidth="xl" className="mt-3">
        <MyNavBar />
        <Toolbar sx={{ marginBottom: "1rem" }} />
        <div>{children}</div>
      </Container>
    </main>
  );
};
