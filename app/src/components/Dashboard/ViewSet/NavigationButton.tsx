import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  icon: IconProp;
  onClick: () => void;
  isRotated?: boolean;
}

const NavigationButton: React.FC<Props> = ({
  icon,
  onClick,
  isRotated = false,
}) => (
  <FontAwesomeIcon
    className="text-5xl text-white transition duration-300 cursor-pointer hover:scale-110"
    style={{
      transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.5s",
    }}
    icon={icon}
    onClick={onClick}
    data-testid="navigationBtn"
  />
);

export default NavigationButton;
