import Header from "../Header";
import { useInvestigators } from "./contexts/LoadInvestigatorsContext";
import InvestigatorCard from "./cards/InvestigatorCard";
import { usePlayerCards } from "./contexts/LoadPlayerCardsContext";
import PlayerCard from "./cards/PlayerCardCard";
import { Link } from "react-router";

export default function App() {
  const { investigators } = useInvestigators();
  const { playerCards } = usePlayerCards();
  const randomInvIndex = Math.floor(Math.random() * investigators.length);
  const randomCardIndex = Math.floor(Math.random() * playerCards.length);
  const randomInvestigator = investigators[randomInvIndex];
  const randomCard = playerCards[randomCardIndex];

  return (
    <section>
      <Header />
      <section className="random-cards">
        <div>
          {randomInvestigator && (
            <InvestigatorCard
              key={randomInvestigator.id}
              {...randomInvestigator}
            />
          )}
        </div>
        <div>
          {randomCard && <PlayerCard key={randomCard.id} {...randomCard} />}
        </div>
      </section>

      <div className="homebuttondiv">
        <Link to="/investigators">
          <button>Browse Investigators</button>
        </Link>
        <button>Browse Cards</button>
        <button>Log in</button>
      </div>
    </section>
  );
}
