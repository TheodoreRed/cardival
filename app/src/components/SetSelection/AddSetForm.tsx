import { useState, FormEvent, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getAccountByUid } from "../../services/accountApi";
import CardSet from "../../models/Card/CardSet";
import { createNewCardSet } from "../../services/cardApi";

interface Props {
  setDisplayModal: (b: boolean) => void;
}

const AddSetForm = ({ setDisplayModal }: Props) => {
  const { account, setAccount } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  const isBtnDisabled = title === "" || isDuplicate;

  const checkForDuplicateTitle = (newTitle: string) => {
    if (account) {
      const duplicate = account?.cardSets.some((set) => set.title === newTitle);
      setIsDuplicate(duplicate);
      setErrorMsg(
        duplicate
          ? "Title Already in Use: Please Choose a Different Name for Your Set"
          : ""
      );
    }
  };

  const submithandler = async (e: FormEvent) => {
    e.preventDefault();

    if (account && account._id) {
      const newCardSet: CardSet = {
        title,
        description,
        cards: [],
      };

      await createNewCardSet(account._id, newCardSet);
      const updatedAccount = await getAccountByUid(account.uid);
      if (updatedAccount) {
        setAccount(updatedAccount);
        setDisplayModal(false);
      } else {
        throw new Error("Error creating new set");
      }
    }

    setDescription("");
  };

  return (
    <form className="flex flex-col items-center p-10" onSubmit={submithandler}>
      <label className="text-3xl" htmlFor="title">
        Name Your Set<span className="pl-2 text-red-400">*</span>
      </label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter Set Title (e.g., 'History', 'Calculus')"
        className="w-5/6 p-5 mx-10 my-5 rounded-md bg-slate-100"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          checkForDuplicateTitle(e.target.value);
        }}
      />
      {title && (
        <>
          <label htmlFor="description" className="text-3xl">
            Describe Your Set
          </label>
          <textarea
            rows={5}
            id="description"
            name="description"
            placeholder="Add a description (optional)"
            className="w-5/6 p-5 mx-10 my-5 font-sans text-xl font-light rounded-md resize-none bg-slate-100"
            value={description}
            draggable={false}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}
      <button
        className={`w-5/6 py-5 bg-blue-200 duration-300 rounded-md ${
          !isBtnDisabled &&
          " bg-blue-400 text-white hover:bg-gradient-to-r from-blue-500 via-blue-300 hover:text-black hover:font-bold to-blue-500 duration-300"
        }`}
        disabled={isBtnDisabled}
      >
        Create Set
      </button>
      <p className="absolute w-1/2 text-xl text-red-700 bottom-5 right-10">
        {errorMsg}
      </p>
    </form>
  );
};

export default AddSetForm;
