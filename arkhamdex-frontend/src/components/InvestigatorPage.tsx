import { useInvestigators } from "./contexts/LoadInvestigatorsContext";
import { useState, useEffect } from "react";
import InvestigatorCard, {
  InvestigatorCardProps,
} from "./cards/InvestigatorCard";
import { factions, cycles } from "./FactionsAndCycles";
import Select, { SingleValue } from "react-select";

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
  const [searchButton, setSearchButton] = useState(false);
  const [activeFactions, setActiveFactions] = useState<string[]>([]);
  const [activeCycles, setActiveCycles] = useState<string[]>([]);

  const [selectedName, setSelectedName] =
    useState<SingleValue<{ value: string; label: string }>>(null);

  const nameOptions = investigators.map((inv) => ({
    value: inv.name,
    label: inv.name,
  }));

  const handleNameSearch = (
    selected: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedName(selected);
  };

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
            cycle.value.includes(inv.pack_name)
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

    if (selectedName) {
      filtered = filtered.filter(
        (inv) => inv.name.toLowerCase() === selectedName.value.toLowerCase()
      );
    }

    setFilteredInvestigators(filtered);
  }, [activeFactions, activeCycles, allInvestigators, selectedName]);

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
        <button
          onClick={(e) => {
            e.preventDefault();
            setSearchButton((prev) => !prev);
          }}
        >
          Search by name
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setFilteredInvestigators(investigators);
            setActiveCycles([]);
            setActiveFactions([]);
          }}
        >
          Reset
        </button>
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
        {searchButton && (
          <Select
            options={nameOptions}
            value={selectedName}
            onChange={handleNameSearch}
            isClearable
            placeholder="Search by name..."
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
          />
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
