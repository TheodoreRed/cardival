import { useContext, useEffect } from "react";
import Header from "../Common/Header/Header";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { navigateToCardSetByTitle } from "../../utils/navigateUtils";
import { useCardSet } from "../../hooks/useCardSet";

const Quiz = () => {
  const { account } = useContext(AuthContext);
  const { cardsetid } = useParams<{ cardsetid: string }>();
  const navigate = useNavigate();
  const { activeSet } = useCardSet(cardsetid ?? "");

  useEffect(() => {
    if (cardsetid && (!activeSet || activeSet.cards.length < 5)) {
      navigateToCardSetByTitle(navigate, cardsetid);
    }
  }, [account]);

  if (!cardsetid || !activeSet || !account) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <Header isQuiz={true} />
    </div>
  );
};

export default Quiz;
