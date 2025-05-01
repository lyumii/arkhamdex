import { useInvestigators } from "./contexts/LoadInvestigatorsContext";
import { useState, useEffect } from "react";
import InvestigatorCard, {
  InvestigatorCardProps,
} from "./cards/InvestigatorCard";

export default function InvestigatorPage() {
  const { investigators } = useInvestigators();
  const [filteredInvestigators, setFilteredInvestigators] = useState<
    InvestigatorCardProps[]
  >([]);
  const [allInvestigators, setAllInvestigators] = useState<
    InvestigatorCardProps[]
  >([]);
  const [classButton, setClassButton] = useState(false);
  const [activeFactions, setActiveFactions] = useState<string[]>([]);

  const factions = [
    "Guardian",
    "Seeker",
    "Rogue",
    "Mystic",
    "Survivor",
    "Neutral",
  ];

  useEffect(() => {
    setAllInvestigators(investigators);
    setFilteredInvestigators(investigators);
  }, [investigators]);

  useEffect(() => {
    let filtered: InvestigatorCardProps[] = [];
    activeFactions.forEach((faction) => {
      const newFaction = allInvestigators.filter(
        (inv) => inv.faction_name === faction
      );
      filtered = [...filtered, ...newFaction];
    });
    setFilteredInvestigators(filtered);
  }, [activeFactions]);

  return (
    <section>
      <h1>Browse Investigators</h1>
      <div>
        <h3>Filter By:</h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            setClassButton((prev) => !prev);
          }}
        >
          Class
        </button>
        <button>Cycle</button>
        <button>Reset</button>
        {classButton && (
          <div>
            {factions.map((faction, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveFactions((prev) => {
                    if (activeFactions.includes(faction)) {
                      return activeFactions.filter((item) => item !== faction);
                    } else {
                      return [...prev, faction];
                    }
                  });
                }}
              >
                {faction}
              </button>
            ))}
          </div>
        )}
        <div>
          {filteredInvestigators.map((inv) => (
            <InvestigatorCard key={inv.id} {...inv} />
          ))}
        </div>
      </div>
    </section>
  );
}
