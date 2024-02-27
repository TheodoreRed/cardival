import { ObjectId } from "mongodb";
import CardSet from "../Card/CardSet";

export default interface Account {
  _id?: ObjectId;
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  cardSets: CardSet[];
}
