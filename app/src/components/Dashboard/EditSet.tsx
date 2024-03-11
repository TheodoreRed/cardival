import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Card from "../../models/Card/Card";
import { updateCardSetCards } from "../../services/cardApi";
import AuthContext from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useCardSet } from "../../hooks/useCardSet";
import CardSet from "../../models/Card/CardSet";

interface Props {
  setIsEditing: (b: boolean) => void;
}

const EditSet = ({ setIsEditing }: Props) => {
  const { account, setAccount } = useContext(AuthContext);
  const { cardsetid } = useParams<{ cardsetid: string }>();

  const { activeSet, setActiveSet } = useCardSet(cardsetid ?? "");

  const [hasChanges, setHasChanges] = useState(false);

  const initialCardsRef = useRef<Card[]>([]);

  if (!account || !activeSet) {
    return <p>Account is loading!</p>;
  }

  useEffect(() => {
    initialCardsRef.current = JSON.parse(JSON.stringify(activeSet.cards));
    if (!activeSet.cards.length) {
      pushEmptyCard();
    }
  }, []);

  const haveCardsChanged = (): boolean => {
    return (
      JSON.stringify(activeSet.cards) !==
      JSON.stringify(initialCardsRef.current)
    );
  };

  const isSaveDisabled = (): boolean => {
    return (
      !haveCardsChanged() ||
      !hasChanges ||
      activeSet.cards.some((card) => card.answer === "" || card.question === "")
    );
  };

  const deleteCard = (cardId: string) => {
    // Filter out the card to be deleted
    const updatedCards = activeSet.cards.filter((card) => card.id !== cardId);
    const updatedCardSet: CardSet = { ...activeSet, cards: updatedCards };
    setActiveSet(updatedCardSet);
    setHasChanges(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (account && account._id) {
      const result = await updateCardSetCards(
        account._id,
        activeSet.title,
        activeSet.cards
      );
      if (result) {
        setAccount(result);
        setIsEditing(false);
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    cardId: string,
    fieldType: "question" | "answer"
  ) => {
    const updatedCards = activeSet.cards.map((card) => {
      if (card.id === cardId) {
        const updatedCard = { ...card, [fieldType]: event.target.value };
        return updatedCard;
      }
      return card;
    });
    setHasChanges(true);
    const updatedCardSet: CardSet = { ...activeSet, cards: updatedCards };
    setActiveSet(updatedCardSet);
  };

  const pushEmptyCard = () => {
    const newCard = {
      id: uuidv4(),
      question: "",
      answer: "",
      attempts: 0,
      successes: 0,
      failures: 0,
    };
    const updatedCards = [...activeSet.cards, newCard];
    const updatedCardSet: CardSet = { ...activeSet, cards: updatedCards };
    setActiveSet(updatedCardSet);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-24">
      <button
        disabled={isSaveDisabled()}
        className={`absolute px-4 py-2 font-semibold duration-300 ease-in-out rounded-lg shadow-lg text-l top-5 left-5 font-julius text-white ${
          isSaveDisabled()
            ? "text-slate-300 bg-green-800"
            : "text-white bg-googleGreen hover:bg-green-200 hover:text-black hover:shadow-xl hover:-translate-y-1"
        }`}
      >
        Save Changes
      </button>
      <ul>
        {activeSet.cards.map((card, index) => (
          <li
            key={card.id}
            className="relative flex flex-col items-center pb-10 mb-5 bg-slate-600"
          >
            <p className="absolute left-0 w-5 text-2xl text-center text-white -translate-y-1/2 top-56 md:translate-x-1/2 md:text-5xl">
              {index + 1}
            </p>
            <label className="text-white" htmlFor={`question-${card.id}`}>
              Question
            </label>
            <textarea
              rows={5}
              id={`question-${card.id}`}
              placeholder="Question/Term"
              className="w-11/12 p-5 my-1 ml-4 text-lg bg-blue-200 resize-none"
              value={card.question}
              draggable={false}
              onChange={(e) => handleChange(e, card.id, "question")}
            />
            <label className="text-white" htmlFor={`answer-${card.id}`}>
              Answer
            </label>
            <textarea
              rows={5}
              id={`answer-${card.id}`}
              placeholder="Answer/Definition"
              className="w-11/12 p-5 my-1 ml-4 text-lg bg-blue-200 resize-none"
              value={card.answer}
              draggable={false}
              onChange={(e) => handleChange(e, card.id, "answer")}
            />
            {activeSet.cards.length > 1 && (
              <button
                type="button"
                onClick={() => deleteCard(card.id)}
                className="absolute p-5 px-4 py-2 m-2 text-xl font-bold text-red-600 rounded -top-3 -left-4 font-julius hover:text-red-700"
              >
                X
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center">
        <div
          onClick={() => pushEmptyCard()}
          className="px-5 py-3 my-5 text-4xl text-white transition duration-300 ease-in-out transform rounded-lg shadow-lg cursor-pointer w-fit bg-slate-600 hover:bg-slate-300 hover:text-black hover:shadow-xl"
        >
          +
        </div>
      </div>
    </form>
  );
};

export default EditSet;
