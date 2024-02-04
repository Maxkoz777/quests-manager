import { useAuth } from "../hooks/useAuth";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};
