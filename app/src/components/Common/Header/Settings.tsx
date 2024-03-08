import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditSettings from "./EditSettings";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import CardSet from "../../../models/Card/CardSet";

interface Props {
  setDisplayModal: (b: boolean) => void;
}

const Settings = ({ setDisplayModal }: Props) => {
  const [edit, setEdit] = useState(false);
  const { cardsetid } = useParams();
  const { account } = useContext(AuthContext);
  const [activeSet, setActiveSet] = useState<CardSet | undefined>(undefined);

  useEffect(() => {
    if (account) {
      const set = account.cardSets.find((set) => set.title === cardsetid);
      if (set) {
        setActiveSet(set);
      }
    }
  }, [account, cardsetid]);

  if (!activeSet) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <FontAwesomeIcon
        className="absolute p-2 text-lg transition duration-300 ease-in-out bg-white rounded-full cursor-pointer top-3 right-3 hover:bg-brightYellow"
        icon={faPencil}
        onClick={() => setEdit((prev) => !prev)}
      />
      {edit ? (
        <EditSettings setDisplayModal={setDisplayModal} activeSet={activeSet} />
      ) : (
        <div className="flex flex-col items-center py-5 mt-3 h-36">
          <div>
            <h2 className="text-3xl text-center">{activeSet.title}</h2>
            <p className="px-10 pt-3 text-center">{activeSet.description}</p>
          </div>
          <div>
            <p>Cards: {activeSet.cards.length}</p>
            <p>Quizzes: {activeSet.quizzes.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
