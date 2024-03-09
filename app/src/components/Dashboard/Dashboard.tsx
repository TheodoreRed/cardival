import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import EditSet from "./EditSet";
import EmptyCardDeckMsg from "./EmptyCardDeckMsg";
import ViewSet from "./ViewSet";
import Header from "../Common/Header/Header";
import { navigateToCardSetQuizByTitle } from "../../utils/dashboardUtils";
import { useCardSet } from "../../hooks/useCardSet";

const Dashboard = () => {
  // https://chat.openai.com/c/64ff96d9-db18-4bc2-bc38-7b153255a0a8

  const { account } = useContext(AuthContext);
  const { cardsetid } = useParams<{ cardsetid: string }>();

  const { activeSet } = useCardSet(cardsetid ?? "");

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isCardDeckEmpty = (): boolean => {
    return !activeSet || activeSet.cards.length === 0;
  };

  if (!account || !activeSet) {
    return <p>Account is loading!</p>;
  }

  const isQuizBtnDisabled = (): boolean => activeSet.cards.length < 5;

  return (
    <div className={`${isEditing ? "h-full" : "h-screen"} bg-googleBlue`}>
      <Header />

      <div className="relative">
        {!isEditing && <GoToQuiz />}
        <ToggleEdit />
        {isEditing && <EditSet setIsEditing={setIsEditing} />}
      </div>
      {!isEditing && !isCardDeckEmpty() && <ViewSet />}
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
    const navigate = useNavigate();
    return (
      <button
        onClick={() => {
          if (activeSet?.title) {
            navigateToCardSetQuizByTitle(navigate, activeSet.title);
          }
        }}
        className={`absolute px-4 py-2 font-semibold text-black duration-300 ease-in-out rounded-lg shadow-lg text-l top-5 left-5 bg-green-500 hover:bg-green-400 hover:text-white hover:shadow-xl hover:-translate-y-1 font-julius`}
        disabled={isQuizBtnDisabled()}
      >
        Quiz
      </button>
    );
  }
};

export default Dashboard;
