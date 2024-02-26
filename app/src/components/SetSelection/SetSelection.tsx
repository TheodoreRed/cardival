import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Modal from "../Common/Modal";
import AddSetForm from "./AddSetForm";

const SetSelection = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const { account } = useContext(AuthContext);

  if (!account) {
    return <p>Loading...</p>; // loading spinner
  }

  return (
    <div className="flex flex-col items-center h-screen bg-googleBlue">
      <h2
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
        className="px-10 py-5 my-10 text-4xl rounded-full shadow-lg bg-slate-200 w-fit "
      >
        <span className="text-gray-800 ">Add or choose a set</span>
      </h2>
      {
        <ul>
          {account.flashcardSets.map((cardSet) => {
            return <li key={cardSet.title}>{cardSet.title}</li>;
          })}
        </ul>
      }
      <button
        onClick={() => setDisplayModal(true)}
        className="px-10 py-5 my-10 text-4xl transition duration-300 ease-in-out transform rounded-lg shadow-lg w-fit bg-slate-200 hover:bg-slate-500 hover:text-white hover:shadow-xl"
      >
        +
      </button>
      <Modal isOpen={displayModal} onClose={() => setDisplayModal(false)}>
        <AddSetForm />
      </Modal>
    </div>
  );
};

export default SetSelection;
