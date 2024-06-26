import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { OrderDetail } from "./components/order/OrderDetail";
import { CreateOrder } from "./components/order/CreateOrder";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Profile } from "./components/profile/Profile";
import { Auth } from "./components/auth/Auth";

export const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<AuthOutlet fallbackPath="/auth" />}>
        <Route path="/" element={<Home />} />
        <Route path="/order-detail/:id" element={<OrderDetail />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
