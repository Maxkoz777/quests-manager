import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "../../utils/Api";
import axios from "axios";
import { VITE_NOTIFICATION_API_URL } from "../../utils/ApiUtils";

export const ShowNotification = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryFn: () => getNotifications(authHeader),
    queryKey: ["notifications"],
    staleTime: 1000,
  });

  const deleteNotification = (
    authHeader: string | null,
    notificationId: number
  ) => {
    return axios.delete(
      `${VITE_NOTIFICATION_API_URL}/notifications/${notificationId}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
  };

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: (notificationId: number) =>
      deleteNotification(authHeader, notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <div>
      <IconButton
        id="notification-button"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <NotificationsActiveIcon sx={{ color: "#fff" }} />
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "notification-button",
        }}
      >
        {isLoading && <MenuItem>Loading...</MenuItem>}
        {notifications?.length === 0 && (
          <MenuItem>There are no notifications</MenuItem>
        )}
        {notifications?.map((item) => {
          return (
            <Box key={item.id} sx={{ display: "flex" }}>
              <MenuItem onClick={handleClose}>
                <div>{item.message}</div>
              </MenuItem>
              <IconButton>
                {item.read ? (
                  <DoneAllIcon sx={{ color: "#00ff00" }} />
                ) : (
                  <DoneAllIcon />
                )}
              </IconButton>
              <IconButton onClick={() => deleteMutation(item.id)}>
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          );
        })}
      </Menu>
    </div>
  );
};
