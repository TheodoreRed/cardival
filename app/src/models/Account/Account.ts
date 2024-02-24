import FlashcardSet from "../Flashcard/FlashcardSet";

export default interface Account {
  _id?: string;
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  flashcardSets: FlashcardSet[];
}
