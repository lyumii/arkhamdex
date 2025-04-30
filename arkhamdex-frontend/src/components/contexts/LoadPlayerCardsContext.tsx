import { createContext, useContext, useState, useEffect } from "react";
import { PlayerCardProps } from "../cards/PlayerCardCard";
import FetchCards from "../../api/CardRoutes";

interface PlayerCardsDataType {
  playerCards: PlayerCardProps[];
  setPlayerCards: React.Dispatch<React.SetStateAction<PlayerCardProps[]>>;
}

const PlayerCardsDataContext = createContext<PlayerCardsDataType | undefined>(
  undefined
);

export default function PlayerCardsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playerCards, setPlayerCards] = useState<PlayerCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await FetchCards();
      if (response && Array.isArray(response.data)) {
        setPlayerCards(response.data);
      } else {
        console.error("Invalid card data:", response);
        setPlayerCards([]);
      }
    };
    fetchData();
  }, []);

  return (
    <PlayerCardsDataContext.Provider value={{ playerCards, setPlayerCards }}>
      {children}
    </PlayerCardsDataContext.Provider>
  );
}

export function usePlayerCards() {
  const context = useContext(PlayerCardsDataContext);
  if (!context)
    throw new Error("cards must be used with PlayerCardsDataContext");
  return context;
}
