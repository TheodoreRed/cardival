import express from "express";
import { getMongoClient } from "../db";
import Account from "../models/Account/Account";
import { errorResponse } from "./AccountRouter";
import { ObjectId } from "mongodb";
import CardSet from "../models/Card/CardSet";
import Card from "../models/Card/Card";

interface RouteParams {
  _id: string;
  activeSetId?: string;
}

const cardSetRouter = express.Router({ mergeParams: true });

// Add a card set to an account
cardSetRouter.post("/", async (req, res) => {
  const { _id } = req.params as RouteParams;
  const cardSet = req.body as CardSet;

  try {
    const client = await getMongoClient();
    const accountCollection = client.db().collection<Account>("accounts");

    const objectId = new ObjectId(_id);

    const updateResult = await accountCollection.updateOne(
      { _id: objectId },
      { $push: { cardSets: cardSet } }
    );

    if (updateResult.modifiedCount === 1) {
      res.status(200).json({ message: "Card set added successfully." });
    } else {
      res.status(404).json({ message: "Account not found." });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

// PATCH endpoint to update a card set's cards within an account
cardSetRouter.patch("/:activeSetId/cards", async (req, res) => {
  const { _id, activeSetId } = req.params as RouteParams;
  const newCards: Card[] = req.body.cards;

  try {
    const client = await getMongoClient();
    const accountsCollection = client.db().collection("accounts");

    // Attempt to update the specified card set for the given account
    const result = await accountsCollection.updateOne(
      { _id: new ObjectId(_id), "cardSets.title": activeSetId },
      { $set: { "cardSets.$.cards": newCards } }
    );

    if (result.modifiedCount === 1) {
      const updatedAccount = await accountsCollection.findOne({
        _id: new ObjectId(_id),
      });
      res.status(200).json(updatedAccount);
    } else {
      res.status(404).json({ message: "Card set not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred." });
  }
});

export default cardSetRouter;
