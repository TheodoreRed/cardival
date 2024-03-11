import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Modal from "../Common/Modal";
import AddSetForm from "./AddSetForm/AddSetForm";
import SingleCardSet from "./SingleCardSet/SingleCardSet";
import { Link } from "react-router-dom";
import FilterInput from "./FilterInput/FilterInput";
import { filterByText } from "../../utils/filterByText";

const SetSelection = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const { account } = useContext(AuthContext);

  if (!account) {
    return <p>Loading...</p>; // loading spinner
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-googleBlue font-julius">
      <h2
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
        className="w-5/6 px-10 py-5 my-10 text-4xl text-center rounded-full shadow-lg md:w-fit bg-slate-200"
      >
        <span
          onClick={() => setDisplayModal(true)}
          className="text-blue-600 duration-300 ease-in-out cursor-pointer hover:text-blue-400"
          data-testid="addSetSpanBtn"
        >
          Add
        </span>{" "}
        or choose a set
      </h2>

      <FilterInput inputText={inputText} setInputText={setInputText} />

      <ul className="w-5/6">
        {filterByText(account.cardSets, inputText).map((cardSet) => {
          return (
            <Link
              key={cardSet.title}
              to={`/${encodeURIComponent(cardSet.title)}`}
            >
              <SingleCardSet cardSet={cardSet} />
            </Link>
          );
        })}
      </ul>

      <button
        onClick={() => setDisplayModal(true)}
        className="px-10 py-5 my-10 text-4xl transition duration-300 ease-in-out transform rounded-lg shadow-lg w-fit bg-slate-200 hover:bg-slate-500 hover:text-white hover:shadow-xl"
        data-testid="addSetBtn"
      >
        +
      </button>
      <Modal isOpen={displayModal} onClose={() => setDisplayModal(false)}>
        <AddSetForm setDisplayModal={setDisplayModal} />
      </Modal>
    </div>
  );
};

export default SetSelection;
