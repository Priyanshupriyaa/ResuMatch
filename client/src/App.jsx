import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const Protected = ({ children }) => {
  const token = useSelector(s => s.auth.token);
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/analyze" element={<Protected><Analyze /></Protected>} />
        <Route path="/history" element={<Protected><History /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}