import Card from "./Card";

export default interface FlashcardSet {
  title: string;
  description?: string;
  cards: Card[];
}
