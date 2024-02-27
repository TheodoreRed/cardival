import axios from "axios";
import Account from "../models/Account/Account";
import CardSet from "../models/Card/CardSet";

const baseUrl: string =
  import.meta.env.VITE_APP_BASE_URL ?? "Some Error With .env.local";

export const createNewCardSet = async (
  _id: string,
  cardSet: CardSet
): Promise<Account> => {
  return (
    await axios.post(
      `${baseUrl}/accounts/${encodeURIComponent(_id)}/card-sets`,
      cardSet
    )
  ).data;
};
