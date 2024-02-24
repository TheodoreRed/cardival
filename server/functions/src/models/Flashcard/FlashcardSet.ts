import Flashcard from "./Flashcard";

export default interface FlashcardSet {
  title: string;
  description?: string;
  flashcards: Flashcard[];
}
