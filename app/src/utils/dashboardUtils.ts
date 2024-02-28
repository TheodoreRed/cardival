import { NavigateFunction } from "react-router-dom";

export const navigateToCardSets = (navigate: NavigateFunction) => {
  navigate("/card-sets");
};

export const navigateHome = (navigate: NavigateFunction) => {
  navigate("/");
};
