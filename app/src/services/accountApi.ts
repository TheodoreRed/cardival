import axios from "axios";
import Account from "../models/Account/Account";

const baseUrl: string =
  import.meta.env.VITE_APP_BASE_URL ?? "Some Error With .env.local";

export const getAccountByUid = async (uid: string): Promise<Account | void> => {
  try {
    return (await axios.get(`${baseUrl}/accounts/${encodeURIComponent(uid)}`))
      .data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const createNewAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${baseUrl}/accounts`, account)).data;
};
