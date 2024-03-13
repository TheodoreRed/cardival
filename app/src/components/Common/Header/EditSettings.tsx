import { useEffect } from "react";
import { useCardSetForm } from "../../../hooks/useCardSetForm";
import { useCardSet } from "../../../hooks/useCardSet";
import { useParams } from "react-router-dom";

interface Props {
  setDisplayModal: (b: boolean) => void;
}

const EditSettings: React.FC<Props> = ({ setDisplayModal }) => {
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
  const { cardsetid } = useParams();

  const { activeSet } = useCardSet(cardsetid ?? "");

  if (!activeSet) {
    return <p data-testid="editSettingsLoading">Loading...</p>;
  }

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
          data-testid="editSetTitleInput"
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
          data-testid="editSetDescriptionInput"
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
