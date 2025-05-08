import Header from "../Header";
import { useInvestigators } from "./contexts/LoadInvestigatorsContext";
import InvestigatorCard from "./cards/InvestigatorCard";
import { usePlayerCards } from "./contexts/LoadPlayerCardsContext";
import PlayerCard from "./cards/PlayerCardCard";
import { Link } from "react-router";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const { investigators } = useInvestigators();
  const { playerCards } = usePlayerCards();
  const { user, logout } = useAuth();
  const randomInvIndex = Math.floor(Math.random() * investigators.length);
  const randomCardIndex = Math.floor(Math.random() * playerCards.length);
  const randomInvestigator = investigators[randomInvIndex];
  const randomCard = playerCards[randomCardIndex];

  return (
    <section>
      {user && (
        <p>
          Welcome, {user.username}! <button onClick={logout}>logout</button>
        </p>
      )}
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
        <Link to="/cards">
          <button>Browse Cards</button>
        </Link>
        {user ? (
          <button>Create a Deck</button>
        ) : (
          <Link to="/login">
            <button>Log in</button>
          </Link>
        )}
        {user && <button>Create a Deck</button>}
      </div>
    </section>
  );
}
