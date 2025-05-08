import Home from "./components/Home";
import { Route, Routes } from "react-router";
import InvestigatorPage from "./components/InvestigatorPage";
import PlayerCardPage from "./components/PlayerCardPage";
import LoginPage from "./components/Login";
import RegisterPage from "./components/RegisterPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/investigators" element={<InvestigatorPage />} />
        <Route path="/cards" element={<PlayerCardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}
