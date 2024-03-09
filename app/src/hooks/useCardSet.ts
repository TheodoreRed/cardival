import { useContext, useEffect } from "react";
import CardSetContext, { CardSetContextModel } from "../context/CardSetContext";
import AuthContext from "../context/AuthContext";

export const useCardSet = (str: string): CardSetContextModel => {
  const { account } = useContext(AuthContext);
  const { activeSet, setActiveSet } = useContext(CardSetContext);

  useEffect(() => {
    if (account && str) {
      const foundSet = account.cardSets.find((set) => set.title === str);
      if (foundSet) {
        setActiveSet(foundSet);
      }
    }
  }, [account, str, setActiveSet]);

  return { activeSet, setActiveSet };
};
