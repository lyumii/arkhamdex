import React, { createContext, useContext, useEffect, useState } from "react";
import { InvestigatorCardProps } from "../cards/InvestigatorCard";
import FetchInvestigators from "../../api/InvestigatorRoutes";

interface InvestigatorDataType {
  investigators: InvestigatorCardProps[];
  setInvestigators: React.Dispatch<
    React.SetStateAction<InvestigatorCardProps[]>
  >;
}

const InvestigatorsDataContext = createContext<
  InvestigatorDataType | undefined
>(undefined);

export default function InvestigatorsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [investigators, setInvestigators] = useState<InvestigatorCardProps[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await FetchInvestigators();
      if (response && Array.isArray(response.data)) {
        setInvestigators(response.data);
      } else {
        console.error("Invalid investigator data:", response);
        setInvestigators([]);
      }
    };
    fetchData();
  }, []);

  return (
    <InvestigatorsDataContext.Provider
      value={{ investigators, setInvestigators }}
    >
      {children}
    </InvestigatorsDataContext.Provider>
  );
}

export function useInvestigators() {
  const context = useContext(InvestigatorsDataContext);
  if (!context)
    throw new Error(
      "useInvestigators must be used within InvestigatorsDataProvider"
    );
  return context;
}
