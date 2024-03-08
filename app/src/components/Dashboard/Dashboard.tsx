import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardSet from "../../models/Card/CardSet";
import AuthContext from "../../context/AuthContext";
import EditSet from "./EditSet";
import Card from "../../models/Card/Card";
import EmptyCardDeckMsg from "./EmptyCardDeckMsg";
import ViewSet from "./ViewSet";
import Header from "../Common/Header/Header";

const Dashboard = () => {
  // https://chat.openai.com/c/64ff96d9-db18-4bc2-bc38-7b153255a0a8
  const { cardsetid } = useParams();

  const { account } = useContext(AuthContext);

  const [activeSet, setActiveSet] = useState<CardSet | null>(null);
  const [cards, setCards] = useState<Card[]>(activeSet?.cards ?? []);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (account && cardsetid) {
      const setActiveCardSetFromAccount = () => {
        const foundSet = account.cardSets.find(
          (set) => set.title === cardsetid
        );
        if (foundSet) setActiveSet(foundSet);
      };

      setActiveCardSetFromAccount();
    }
  }, [account, cardsetid]);

  useEffect(() => {
    if (activeSet) {
      setCards(activeSet.cards);
    }
  }, [activeSet, isEditing]);

  const isCardDeckEmpty = (): boolean => {
    if (!account || !cardsetid) {
      return true;
    }
    const foundSet = account.cardSets.find((set) => set.title === cardsetid);
    if (!foundSet) {
      return true;
    }

    return foundSet.cards.length === 0;
  };

  if (!account || !activeSet || !cards) {
    return <p>Account is loading!</p>;
  }

  const isQuizBtnDisabled = (): boolean => activeSet.cards.length < 5;

  return (
    <div className={`${isEditing ? "h-full" : "h-screen"} bg-googleBlue`}>
      <Header />

      <div className="relative">
        {!isEditing && <GoToQuiz />}
        <ToggleEdit />
        {isEditing && (
          <EditSet
            cards={cards}
            setCards={setCards}
            cardSetTitle={activeSet.title}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
      {!isEditing && !isCardDeckEmpty() && <ViewSet cards={cards} />}
      {!isEditing && isCardDeckEmpty() && <EmptyCardDeckMsg />}
    </div>
  );

  function ToggleEdit() {
    return (
      <button
        onClick={() => {
          console.log("Clicked");
          setIsEditing((prev) => !prev);
        }}
        className={`absolute px-4 py-2 font-semibold text-black duration-300 ease-in-out rounded-lg shadow-lg text-l top-5 right-5 bg-brightYellow hover:shadow-xl hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-brightYellow focus:ring-opacity-50 font-julius ${
          isEditing && "bg-red-700 text-white"
        }`}
      >
        {isEditing ? "Cancel" : "Edit Set"}
      </button>
    );
  }

  function GoToQuiz() {
    return (
      <Link to={`/${cardsetid}/quiz`}>
        <button
          onClick={() => {}}
          className={`absolute px-4 py-2 font-semibold text-black duration-300 ease-in-out rounded-lg shadow-lg text-l top-5 left-5 bg-green-500 hover:bg-green-400 hover:text-white hover:shadow-xl hover:-translate-y-1 font-julius`}
          disabled={isQuizBtnDisabled()}
        >
          Quiz
        </button>
      </Link>
    );
  }
};

export default Dashboard;
