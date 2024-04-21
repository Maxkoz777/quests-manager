import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { OrderDetail } from "./components/order/OrderDetail";
import { NewOrder } from "./components/order/NewOrder";
import { Dashboard } from "./components/dashboard/Dashboard";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/order-detail/:id" element={<OrderDetail />} />
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/profile" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
