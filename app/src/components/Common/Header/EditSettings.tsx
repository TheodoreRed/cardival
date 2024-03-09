import { useEffect } from "react";
import CardSet from "../../../models/Card/CardSet";
import { useCardSetForm } from "../../../hooks/useCardSetForm";

interface Props {
  setDisplayModal: (b: boolean) => void;
  activeSet: CardSet;
}

const EditSettings: React.FC<Props> = ({ setDisplayModal, activeSet }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    errorMsg,
    isDuplicate,
    checkForDuplicateTitle,
    submitHandler,
  } = useCardSetForm({ setDisplayModal });

  useEffect(() => {
    setTitle(activeSet.title);
    setDescription(activeSet.description ?? "");
  }, []);

  return (
    <form
      className="flex flex-col items-center py-5 mt-3 h-36"
      onSubmit={(e) => submitHandler(e, activeSet)}
    >
      <div className="flex flex-col w-5/6 items-left">
        <label>Set Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value !== activeSet.title) {
              checkForDuplicateTitle(e.target.value);
            }
          }}
        />
      </div>
      <div className="flex flex-col w-5/6 items-left">
        <label>Set Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none "
        />
      </div>

      <button
        disabled={isDuplicate}
        className="absolute px-5 py-1 text-lg transition duration-300 ease-in-out bg-blue-300 rounded bottom-3 right-3 hover:bg-blue-400"
      >
        Save Settings
      </button>
      <p className="absolute w-1/2 text-red-700 text-md bottom-5 right-1/4">
        {errorMsg}
      </p>
    </form>
  );
};

export default EditSettings;
