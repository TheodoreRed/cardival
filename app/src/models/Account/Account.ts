import CardSet from "../Card/CardSet";

export default interface Account {
  _id?: string;
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  cardSets: CardSet[];
}
