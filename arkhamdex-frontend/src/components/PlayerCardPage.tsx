import { usePlayerCards } from "./contexts/LoadPlayerCardsContext";
import { useState, useEffect } from "react";
import PlayerCard, { PlayerCardProps } from "./cards/PlayerCardCard";
import { factions, cycles } from "./FactionsAndCycles";
import { traits } from "./Traits";
import Select, { MultiValue } from "react-select";

export default function PlayerCardPage() {
  const { playerCards } = usePlayerCards();
  const [filteredCards, setFilteredCards] = useState<PlayerCardProps[]>([]);
  const [allCards, setAllCards] = useState<PlayerCardProps[]>([]);

  const [classButton, setClassButton] = useState(false);
  const [cycleButton, setCycleButton] = useState(false);
  const [traitButton, setTraitButton] = useState(false);

  const [activeFactions, setActiveFactions] = useState<string[]>([]);
  const [activeCycles, setActiveCycles] = useState<string[]>([]);
  const [selectedTrait, setSelectedTrait] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const handleChange = (
    selected: MultiValue<{ value: string; label: string }>
  ) => {
    setSelectedTrait(selected);
  };

  const traitOptions = traits.map((trait) => ({
    value: trait,
    label: trait,
  }));

  useEffect(() => {
    setAllCards(playerCards);
    setFilteredCards(playerCards);
  }, [playerCards]);

  useEffect(() => {
    let filtered = allCards;
    if (activeFactions.length > 0) {
      filtered = filtered.filter((card) =>
        activeFactions.includes(card.faction_name)
      );
    }

    if (activeCycles.length > 0) {
      let cycleFiltered: PlayerCardProps[] = [];

      activeCycles.forEach((cycleKey) => {
        const cycle = cycles.find((c) => c.key === cycleKey);
        if (!cycle) return;

        if (Array.isArray(cycle.value)) {
          const matches = filtered.filter((card) =>
            cycle.value.includes(card.pack_name)
          );
          cycleFiltered = [...cycleFiltered, ...matches];
        } else {
          const matches = filtered.filter(
            (card) => card.pack_name === cycle.value
          );
          cycleFiltered = [...cycleFiltered, ...matches];
        }
      });

      filtered = cycleFiltered;
    }

    const selectedValues = selectedTrait.map((t) => t.value);

    const filteredCards = filtered.filter(
      (card) =>
        card.traits &&
        selectedValues.every((trait) => card.traits.includes(trait))
    );

    setFilteredCards(filteredCards);
  }, [activeFactions, activeCycles, allCards, selectedTrait]);

  return (
    <section>
      <h1>Browse Player Cards</h1>
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
            setTraitButton((prev) => !prev);
          }}
        >
          Trait
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setFilteredCards(playerCards);
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
        {traitButton && (
          <Select
            options={traitOptions}
            onChange={handleChange}
            value={selectedTrait}
            isClearable
            isMulti
            placeholder="Filter by trait..."
          />
        )}
        <div className="investigatorslist">
          {filteredCards.map((inv) => (
            <PlayerCard key={inv.id} {...inv} />
          ))}
        </div>
      </div>
    </section>
  );
}
