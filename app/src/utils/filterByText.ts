import CardSet from "../models/Card/CardSet";

export const filterByText = (sets: CardSet[], inputText: string): CardSet[] => {
  return sets.filter(
    (s) =>
      s.title.toLowerCase().includes(inputText.toLowerCase()) ||
      s.description?.toLowerCase().includes(inputText.toLowerCase())
  );
};
