import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../models/Card/Card";
import { useState } from "react";

interface Props {
  cards: Card[];
}

const ViewSet = ({ cards }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const isShortText = (text: string | undefined) => (text ?? "").length <= 400;

  const currentText = flipped
    ? cards[currentIndex]?.answer
    : cards[currentIndex]?.question;
  const centerContentClass = isShortText(currentText)
    ? "flex justify-center items-center"
    : "";

  return (
    <div className="bg-blue-200 flex flex-col items-center mt-24 relative">
      {flipped && (
        <p className="absolute left-2 -top-8 bg-blue-200 font-bold px-5">
          Answer
        </p>
      )}
      <div
        className={`overflow-y-auto text-xl p-2 text-center h-72 ${centerContentClass}`}
      >
        <p>
          {flipped
            ? cards[currentIndex]?.answer
            : cards[currentIndex]?.question}
        </p>
      </div>
      <div className="w-full flex justify-around items-center relative bg-googleBlue">
        <button className="text-4xl" onClick={handlePrev}>
          {"<"}
        </button>
        <FontAwesomeIcon
          className="text-2xl cursor-pointer"
          icon={faRotateLeft}
          onClick={() => setFlipped((prev) => !prev)}
        />
        <button className="text-4xl" onClick={handleNext}>
          {">"}
        </button>
        <p className="absolute -bottom-16 text-2xl">
          {currentIndex + 1}/{cards.length}
        </p>
      </div>
    </div>
  );
};

export default ViewSet;
