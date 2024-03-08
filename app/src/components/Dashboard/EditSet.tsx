import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Card from "../../models/Card/Card";
import { updateCardSetCards } from "../../services/cardApi";
import AuthContext from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

interface Props {
  cards: Card[];
  setCards: (c: Card[]) => void;
  cardSetTitle: string;
  setIsEditing: (b: boolean) => void;
}

const EditSet = ({ cards, setCards, cardSetTitle, setIsEditing }: Props) => {
  const { account, setAccount } = useContext(AuthContext);

  const [hasChanges, setHasChanges] = useState(false);

  const initialCardsRef = useRef<Card[]>([]);

  useEffect(() => {
    initialCardsRef.current = JSON.parse(JSON.stringify(cards));
    if (!cards.length) {
      pushEmptyCard();
    }
  }, []);

  const haveCardsChanged = (): boolean => {
    return JSON.stringify(cards) !== JSON.stringify(initialCardsRef.current);
  };

  const isSaveDisabled = (): boolean => {
    return (
      !haveCardsChanged() ||
      !hasChanges ||
      cards.some((card) => card.answer === "" || card.question === "")
    );
  };

  const deleteCard = (cardId: string) => {
    // Filter out the card to be deleted
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
    setHasChanges(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (account && account._id) {
      const result = await updateCardSetCards(account._id, cardSetTitle, cards);
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
    const updatedCards = cards.map((card) => {
      if (card.id === cardId) {
        const updatedCard = { ...card, [fieldType]: event.target.value };
        return updatedCard;
      }
      return card;
    });
    setHasChanges(true);
    setCards(updatedCards);
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
    setCards([...cards, newCard]);
  };

  useEffect(() => {
    if (!cards.length) {
      pushEmptyCard();
    }
  }, []);

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
        {cards.map((card, index) => (
          <li
            key={card.id}
            className="relative flex flex-col items-center pb-10 mb-5 bg-slate-600"
          >
            <p className="absolute top-0 left-0 w-5 text-center bg-blue-200 text-md rounded-br-md md:text-2xl">
              {index + 1}
            </p>
            <label className="text-white" htmlFor={`question-${card.id}`}>
              Question
            </label>
            <textarea
              rows={5}
              id={`question-${card.id}`}
              placeholder="Question/Term"
              className="w-11/12 p-5 my-1 text-lg bg-blue-200 resize-none"
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
              className="w-11/12 p-5 my-1 text-lg bg-blue-200 resize-none"
              value={card.answer}
              draggable={false}
              onChange={(e) => handleChange(e, card.id, "answer")}
            />
            <button
              type="button"
              onClick={() => deleteCard(card.id)}
              className="absolute font-julius text-xs right-0 bottom-0 m-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
            >
              Remove
            </button>
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