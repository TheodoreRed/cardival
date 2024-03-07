import { faArrowLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navigateToCardSets } from "../../utils/dashboardUtils";
import { useNavigate } from "react-router-dom";

const NavigationIcons = () => {
  const navigate = useNavigate();

  return (
    <>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="absolute text-3xl text-white duration-300 transform -translate-y-1/2 cursor-pointer top-1/2 left-5 hover:text-black"
        onClick={() => navigateToCardSets(navigate)}
      />
      <FontAwesomeIcon
        icon={faGear}
        className="absolute text-3xl text-white duration-300 transform -translate-y-1/2 cursor-pointer top-1/2 right-5 hover:text-black"
        onClick={() => {}}
      />
    </>
  );
};

export default NavigationIcons;
