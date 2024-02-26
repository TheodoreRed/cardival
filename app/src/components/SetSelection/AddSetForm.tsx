import { useState, FC, FormEvent } from "react";
import FlashcardSet from "../../models/Flashcard/FlashcardSet";

const AddSetForm: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isBtnDisabled = title === "" || description === "";

  const submithandler = (e: FormEvent) => {
    e.preventDefault();
    const newFlashcardSet: FlashcardSet = {
      title,
      description,
      flashcards: [],
    };
  };

  return (
    <form className="flex flex-col items-center p-10">
      <label className="text-3xl" htmlFor="title" onSubmit={submithandler}>
        Add a Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Title name"
        className="w-5/6 p-5 mx-10 my-5 rounded-md bg-slate-100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {title && (
        <>
          <label htmlFor="description" className="text-3xl">
            Add a Description
          </label>
          <textarea
            rows={5}
            id="description"
            name="description"
            placeholder="Add a description"
            className="w-5/6 p-5 mx-10 my-5 rounded-md resize-none bg-slate-100"
            value={description}
            draggable={false}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}
      <button
        className={`w-5/6 py-5 bg-blue-200   rounded-md ${
          !isBtnDisabled &&
          "bg-blue-400 text-white hover:bg-gradient-to-r from-blue-500 via-blue-300 hover:text-black hover:font-bold to-blue-500"
        }`}
        disabled={isBtnDisabled}
      >
        Add
      </button>
    </form>
  );
};

export default AddSetForm;
