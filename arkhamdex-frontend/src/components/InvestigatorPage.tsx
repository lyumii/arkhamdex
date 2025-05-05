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
  const [cycleButton, setCycleButton] = useState(false);
  const [activeFactions, setActiveFactions] = useState<string[]>([]);
  const [activeCycles, setActiveCycles] = useState<string[]>([]);

  const factions = [
    "Guardian",
    "Seeker",
    "Rogue",
    "Mystic",
    "Survivor",
    "Neutral",
  ];

  const cycles = [
    { key: "Core Set", value: "Core Set" },
    { key: "The Dunwich Legacy", value: "The Dunwich Legacy" },
    { key: "The Path to Carcosa", value: "The Path To Carcosa" },
    { key: "The Forgotten Age", value: "The Forgotten Age" },
    { key: "The Circle Undone", value: "The Circle Undone" },
    { key: "The Dream-Eaters", value: "The Dream-Eaters" },
    { key: "The Innsmouth Conspiracy", value: "The Innsmouth Conspiracy" },
    {
      key: "Edge of the Earth",
      value: "Edge of the Earth Investigator Expansion",
    },
    {
      key: "The Scarlet Keys",
      value: "The Scarlet Keys Investigator Expansion",
    },
    {
      key: "The Feast of Hemlock Vale",
      value: "The Feast of Hemlock Vale Investigator Expansion",
    },
    {
      key: "The Drowned City",
      value: "The Drowned City Investigator Expansion",
    },
    {
      key: "Standalone",
      value: [
        "Winifred Habbamock",
        "Harvey Walters",
        "Jacqueline Fine",
        "Nathaniel Cho",
        "Stella Clark",
      ],
    },
    {
      key: "Parallell",
      value: [
        "All or Nothing",
        "Aura of Faith",
        "By the Book",
        "Bad Blood",
        "Hunting For Answers",
        "Laid to Rest",
        "On the Road Again",
        "Path of the Righteous",
        "Read or Die",
        "Red Tide Rising",
        "Relics of the Past",
      ],
    },
    {
      key: "Book Promos",
      value: [
        "Blood of Baalshandor",
        "Dark Revelations",
        "Ire of the Void",
        "Hour of the Huntress",
        "The Dirge Of Reason",
        "To Fight the Black Wind",
        "The Deep Gate",
      ],
    },
  ];

  useEffect(() => {
    setAllInvestigators(investigators);
    setFilteredInvestigators(investigators);
  }, [investigators]);

  useEffect(() => {
    let filtered = allInvestigators;
    if (activeFactions.length > 0) {
      filtered = filtered.filter((inv) =>
        activeFactions.includes(inv.faction_name)
      );
    }

    if (activeCycles.length > 0) {
      let cycleFiltered: InvestigatorCardProps[] = [];

      activeCycles.forEach((cycleKey) => {
        const cycle = cycles.find((c) => c.key === cycleKey);
        if (!cycle) return;

        if (Array.isArray(cycle.value)) {
          const matches = filtered.filter((inv) =>
            cycle.value.includes(inv.name)
          );
          cycleFiltered = [...cycleFiltered, ...matches];
        } else {
          const matches = filtered.filter(
            (inv) => inv.pack_name === cycle.value
          );
          cycleFiltered = [...cycleFiltered, ...matches];
        }
      });

      filtered = cycleFiltered;
    }

    setFilteredInvestigators(filtered);
  }, [activeFactions, activeCycles, allInvestigators]);

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
        <button
          onClick={(e) => {
            e.preventDefault();
            setCycleButton((prev) => !prev);
          }}
        >
          Cycle
        </button>
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
        {cycleButton && (
          <div>
            {cycles.map((cycle, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCycles((prev) => {
                    if (activeCycles.includes(cycle.key)) {
                      return activeCycles.filter((item) => item !== cycle.key);
                    } else {
                      return [...prev, cycle.key];
                    }
                  });
                }}
              >
                {cycle.key}
              </button>
            ))}
          </div>
        )}
        <div className="investigatorslist">
          {filteredInvestigators.map((inv) => (
            <InvestigatorCard key={inv.id} {...inv} />
          ))}
        </div>
      </div>
    </section>
  );
}
