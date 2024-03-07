const EmptyCardDeckMsg = () => {
  return (
    <div className="relative flex flex-col items-center justify-center top-1/4">
      <p className="w-48 p-5 text-2xl text-center text-white border border-black rounded-md shadow-lg bottom-36 font-julius bg-darkGoogleBlue">
        Flashcard deck is empty
      </p>
    </div>
  );
};

export default EmptyCardDeckMsg;
