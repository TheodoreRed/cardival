import { useParams } from "react-router-dom";
import { faArrowLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  navigateToCardSetByTitle,
  navigateToCardSets,
} from "../../../utils/navigateUtils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal";
import Settings from "./Settings";

interface Props {
  isQuiz?: boolean;
}

const Header = ({ isQuiz }: Props) => {
  const { cardsetid } = useParams();
  const navigate = useNavigate();
  const [displayModal, setDisplayModal] = useState(false);

  const handleSettingsClick = () => {
    setDisplayModal(true);
  };

  return (
    <div className="relative">
      <h2 className="p-8 px-16 text-4xl text-center text-white bg-blue-600 font-julius">
        {cardsetid}
      </h2>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="absolute text-3xl text-white duration-300 transform -translate-y-1/2 cursor-pointer top-1/2 left-5 hover:text-black"
        onClick={() => {
          if (isQuiz && cardsetid) {
            navigateToCardSetByTitle(navigate, cardsetid);
          } else {
            navigateToCardSets(navigate);
          }
        }}
      />
      <FontAwesomeIcon
        icon={faGear}
        className="absolute text-3xl text-white duration-300 transform -translate-y-1/2 cursor-pointer top-1/2 right-5 hover:text-black"
        onClick={() => handleSettingsClick()}
      />
      <Modal isOpen={displayModal} onClose={() => setDisplayModal(false)}>
        <Settings setDisplayModal={setDisplayModal} />
      </Modal>
    </div>
  );
};

export default Header;
