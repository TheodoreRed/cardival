import Card from "./Card";

export default interface CardSet {
  title: string;
  description?: string;
  cards: Card[];
}
