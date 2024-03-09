import React from "react";
import { useCardSetForm } from "../../../hooks/useCardSetForm";
import TitleInput from "./Elements/TitleInput";
import DescriptionTextArea from "./Elements/DescriptionTextArea";
import SubmitButton from "./Elements/SubmitButton";

interface AddSetFormProps {
  setDisplayModal: (b: boolean) => void;
}

const AddSetForm: React.FC<AddSetFormProps> = ({ setDisplayModal }) => {
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

  return (
    <form
      className="flex flex-col items-center py-10"
      onSubmit={submitHandler}
      data-testid="formElement"
    >
      <TitleInput
        title={title}
        setTitle={setTitle}
        checkForDuplicateTitle={checkForDuplicateTitle}
      />
      {title && (
        <DescriptionTextArea
          description={description}
          setDescription={setDescription}
        />
      )}
      <SubmitButton isDisabled={title === "" || isDuplicate} />
      <p
        className="absolute w-1/2 text-red-700 text-md bottom-5 right-10"
        data-testid="errorElement"
      >
        {errorMsg}
      </p>
    </form>
  );
};

export default AddSetForm;
