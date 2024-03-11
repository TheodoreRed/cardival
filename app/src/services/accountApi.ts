import axios from "axios";
import Account from "../models/Account/Account";

import { config } from "../config/config";

const { apiUrl } = config;
export const getAccountByUid = async (uid: string): Promise<Account | void> => {
  try {
    return (await axios.get(`${apiUrl}/accounts/${encodeURIComponent(uid)}`))
      .data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const createNewAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${apiUrl}/accounts`, account)).data;
};
