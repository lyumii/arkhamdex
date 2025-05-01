import Home from "./components/Home";
import { Route, Routes } from "react-router";
import InvestigatorPage from "./components/InvestigatorPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/investigators" element={<InvestigatorPage />} />
        {/* <Route path="/cards" element={<CardsPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </>
  );
}
