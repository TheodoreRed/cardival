import { NavigateFunction } from "react-router-dom";

export const navigateHome = (navigate: NavigateFunction) => {
  navigate("/");
};

export const navigateToCardSets = (navigate: NavigateFunction) => {
  navigate("/card-sets");
};

export const navigateToCardSetByTitle = (
  navigate: NavigateFunction,
  title: string
) => {
  navigate(`/${title}`);
};

export const navigateToCardSetQuizByTitle = (
  navigate: NavigateFunction,
  title: string
) => {
  navigate(`/${title}/quiz`);
};
