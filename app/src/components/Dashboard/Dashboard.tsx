import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardSet from "../../models/Card/CardSet";
import AuthContext from "../../context/AuthContext";
import EditSet from "./EditSet";
import Card from "../../models/Card/Card";
import NavigationIcons from "./NavigationIcons";
import EmptyCardDeckMsg from "./EmptyCardDeckMsg";
import ViewSet from "./ViewSet";

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

  return (
    <div className={`${isEditing ? "h-full" : "h-screen"} bg-googleBlue`}>
      <div className="relative">
        <h2 className="p-8 px-16 text-4xl text-center text-white bg-blue-600 font-julius">
          {cardsetid}
        </h2>
        <NavigationIcons />
      </div>

      <div className="relative">
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
};

export default Dashboard;
