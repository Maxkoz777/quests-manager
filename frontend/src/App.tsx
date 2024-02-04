import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AuthContext } from "./context/AuthContext";

export const App = () => {
  const { user, setUser } = useAuth();

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
};
