import { createContext } from "react";
import CardSet from "../models/Card/CardSet";

export interface CardSetContextModel {
  activeSet: CardSet | null;
  setActiveSet: (c: CardSet) => void;
}

const defaultValue: CardSetContextModel = {
  activeSet: null,
  setActiveSet: () => {},
};

const CardSetContext = createContext(defaultValue);
export default CardSetContext;
