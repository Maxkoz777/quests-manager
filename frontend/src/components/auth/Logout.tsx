import { Button } from "@mui/material";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    const signedOut = signOut();

    if (signedOut) {
      navigate("/auth");
    }
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};
