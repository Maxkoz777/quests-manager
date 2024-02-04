import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogoutButton } from "./Logout";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Base } from "./Base";

export const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <Base>
      <>
        {user ? (
          <LogoutButton />
        ) : (
          <Link to={{ pathname: "login" }}>
            <Button variant="contained">Login</Button>
          </Link>
        )}
        <h1>Hello there! {`${user ? user.name : "Stranger"}`}</h1>
      </>
    </Base>
  );
};
