import { ObjectId } from "mongodb";
import FlashcardSet from "../Flashcard/FlashcardSet";

export default interface Account {
  _id?: ObjectId;
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  flashcardSets: FlashcardSet[];
}
