import { ReactNode, useState } from "react";
import CardSetContext from "./CardSetContext";
import CardSet from "../models/Card/CardSet";

interface Props {
  children: ReactNode;
}

const CardSetContextProvider = ({ children }: Props) => {
  const [activeSet, setActiveSet] = useState<CardSet | null>(null);

  return (
    <CardSetContext.Provider value={{ activeSet, setActiveSet }}>
      {children}
    </CardSetContext.Provider>
  );
};

export default CardSetContextProvider;
