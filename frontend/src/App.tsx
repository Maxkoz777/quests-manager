import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { TaskDetail } from "./components/TaskDetail";
import { NewTask } from "./components/NewTask";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/task-detail/:id" element={<TaskDetail />} />
        <Route path="/new-task" element={<NewTask />} />
      </Route>
    </Routes>
  );
};
