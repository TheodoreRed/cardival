import axios from "axios";
import Account from "../models/Account/Account";
import CardSet from "../models/Card/CardSet";
import Card from "../models/Card/Card";

import { config } from "../config/config";

const { apiUrl } = config;

export const createNewCardSet = async (
  _id: string,
  cardSet: CardSet
): Promise<Account> => {
  return (
    await axios.post(
      `${apiUrl}/accounts/${encodeURIComponent(_id)}/card-sets`,
      cardSet
    )
  ).data;
};

export const replaceCardSet = async (
  _id: string,
  activeSetTitle: string,
  newSet: CardSet
) => {
  try {
    const response = await axios.put(
      `${apiUrl}/accounts/${encodeURIComponent(
        _id
      )}/card-sets/${encodeURIComponent(activeSetTitle)}/replace`,
      newSet
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating card set cards:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Updates the cards of a specific card set within an account.
 * @param accountId The ID of the account containing the card set.
 * @param cardSetId The ID (or title) of the card set being updated.
 * @param cards The new array of cards to be set for the card set.
 * @returns Promise<Account> The updated account data or an error message.
 */
export const updateCardSetCards = async (
  accountId: string,
  cardSetId: string,
  cards: Card[]
): Promise<Account | null> => {
  try {
    const response = await axios.patch(
      `${apiUrl}/accounts/${encodeURIComponent(
        accountId
      )}/card-sets/${encodeURIComponent(cardSetId)}/cards`,
      { cards }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating card set cards:",
      error.response?.data || error.message
    );
    throw error;
  }
};
