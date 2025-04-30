import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import InvestigatorsDataProvider from "./components/contexts/LoadInvestigatorsContext.tsx";
import PlayerCardsDataProvider from "./components/contexts/LoadPlayerCardsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InvestigatorsDataProvider>
      <PlayerCardsDataProvider>
        <App />
      </PlayerCardsDataProvider>
    </InvestigatorsDataProvider>
  </StrictMode>
);
