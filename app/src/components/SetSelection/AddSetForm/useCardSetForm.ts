import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import CardSet from "../../../models/Card/CardSet";
import { createNewCardSet, replaceCardSet } from "../../../services/cardApi";
import { getAccountByUid } from "../../../services/accountApi";
import { navigateToCardSetByTitle } from "../../../utils/dashboardUtils";
import { useNavigate } from "react-router-dom";

interface Props {
  setDisplayModal: (b: boolean) => void;
}

export const useCardSetForm = ({ setDisplayModal }: Props) => {
  const { account, setAccount } = useContext(AuthContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkForDuplicateTitle = (newTitle: string) => {
    if (account) {
      const duplicate = account?.cardSets.some(
        (set) => set.title.toLowerCase() === newTitle.toLowerCase()
      );
      setIsDuplicate(duplicate);
      setErrorMsg(
        duplicate ? "Name already in use: Please choose another" : ""
      );
    }
  };

  const submitHandler = async (e: React.FormEvent, activeSet?: CardSet) => {
    e.preventDefault();
    if (!account || !account._id) return;

    if (activeSet === undefined) {
      const newCardSet: CardSet = {
        title,
        description,
        cards: [],
        quizzes: [],
      };
      await createNewCardSet(account._id, newCardSet);
    } else {
      const newCardSet: CardSet = { ...activeSet, title, description };
      await replaceCardSet(account._id, activeSet.title, newCardSet);
      navigateToCardSetByTitle(navigate, newCardSet.title);
    }

    const updatedAccount = await getAccountByUid(account.uid);
    if (updatedAccount) {
      setAccount(updatedAccount);
      setDisplayModal(false);
    } else {
      throw new Error("Error creating new set");
    }

    setDescription("");
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    errorMsg,
    isDuplicate,
    checkForDuplicateTitle,
    submitHandler,
  };
};
