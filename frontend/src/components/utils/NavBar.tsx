import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Link } from "react-router-dom";
import { LogoutButton } from "../auth/Logout";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { VITE_APP_TITLE } from "../../utils/ApiUtils";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../../models/User";
import { ShowNotification } from "../notification/ShowNotification";

export const NavBar = () => {
  const isAuthenticated = useIsAuthenticated();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const auth = useAuthUser<User>();

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
              to={"/"}
            >
              <TaskAltIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  color: "#fff",
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {VITE_APP_TITLE}
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "flex" },
                  justifyContent: { md: "" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  {isAuthenticated() && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <Link to={{ pathname: "/create-order" }}>
                        <Button variant="contained">Create Order</Button>
                      </Link>
                      <Link to={{ pathname: "/dashboard" }}>
                        <Button variant="contained">Dashboard</Button>
                      </Link>
                      <Link to={{ pathname: "/profile" }}>
                        <Button variant="contained">
                          <Typography>{auth?.username} Profile</Typography>
                        </Button>
                      </Link>
                      <LogoutButton />
                    </Box>
                  )}
                  {!isAuthenticated() && (
                    <>
                      <Link to={{ pathname: "/login" }}>
                        <Button>Login</Button>
                      </Link>
                      <Link to={{ pathname: "/register" }}>
                        <Button>Register</Button>
                      </Link>
                    </>
                  )}
                </MenuItem>
              </Menu>
            </Box>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
              to={"/"}
            >
              <TaskAltIcon
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "#fff",
                  mr: 1,
                }}
              />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {VITE_APP_TITLE}
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1" }}>
            {isAuthenticated() && (
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  gap: "20px",
                }}
              >
                <Link to={{ pathname: "/create-order" }}>
                  <Button variant="contained">Create Order</Button>
                </Link>
                <Link to={{ pathname: "/dashboard" }}>
                  <Button variant="contained">Dashboard</Button>
                </Link>
                <Link to={{ pathname: "/profile" }}>
                  <Button variant="contained">
                    <Typography>{auth?.username} Profile</Typography>
                  </Button>
                </Link>
                <ShowNotification />
                <LogoutButton />
              </Box>
            )}
            {!isAuthenticated() && (
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Link to={{ pathname: "/login" }}>
                  <Button variant="contained">Login</Button>
                </Link>
                <Link to={{ pathname: "/register" }}>
                  <Button variant="contained">Register</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
