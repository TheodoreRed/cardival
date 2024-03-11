import {
  faArrowsSpin,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCardSet } from "../../hooks/useCardSet";

const ViewSet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { cardsetid } = useParams<{ cardsetid: string }>();

  const { activeSet } = useCardSet(cardsetid ?? "");

  if (!activeSet) {
    return <p>Account is loading!</p>;
  }

  const handleNext = () => {
    if (currentIndex < activeSet.cards.length - 1) {
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
    ? activeSet.cards[currentIndex]?.answer
    : activeSet.cards[currentIndex]?.question;
  const centerContentClass = isShortText(currentText)
    ? "flex justify-center items-center"
    : "";
  const [isRotated, setIsRotated] = useState(false);

  return (
    <div className="relative flex flex-col items-center mt-24 bg-blue-200">
      <p className="absolute p-4 text-2xl bg-blue-200 rounded-full -top-20">
        {currentIndex + 1}/{activeSet.cards.length}
      </p>
      {flipped && (
        <p className="absolute px-5 font-bold bg-blue-200 left-2 -top-8">
          Answer
        </p>
      )}
      <div
        className={`overflow-y-auto text-xl p-2 text-center bg-blue-200 h-72 ${centerContentClass}`}
      >
        <p>
          {flipped
            ? activeSet.cards[currentIndex]?.answer
            : activeSet.cards[currentIndex]?.question}
        </p>
      </div>
      <div className="relative flex items-center justify-around w-full pt-3 top-1/2 bg-googleBlue">
        <FontAwesomeIcon
          className="text-5xl text-white transition duration-300 cursor-pointer hover:scale-110"
          icon={faCircleChevronLeft}
          onClick={handlePrev}
        />
        <FontAwesomeIcon
          style={{
            transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s",
          }}
          icon={faArrowsSpin}
          className="text-5xl text-white transition duration-300 cursor-pointer hover:scale-110"
          onClick={() => {
            setFlipped((prev) => !prev);
            setIsRotated((prev) => !prev);
          }}
        />
        <FontAwesomeIcon
          className="text-5xl text-white transition duration-300 cursor-pointer hover:scale-110"
          icon={faCircleChevronRight}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default ViewSet;
