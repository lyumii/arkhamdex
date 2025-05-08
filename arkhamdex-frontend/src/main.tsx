import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import InvestigatorsDataProvider from "./components/contexts/LoadInvestigatorsContext.tsx";
import PlayerCardsDataProvider from "./components/contexts/LoadPlayerCardsContext.tsx";
import { AuthProvider } from "./components/contexts/AuthContext.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/arkhamdex">
    <StrictMode>
      <AuthProvider>
        <InvestigatorsDataProvider>
          <PlayerCardsDataProvider>
            <App />
          </PlayerCardsDataProvider>
        </InvestigatorsDataProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
