import express from "express";
import { getMongoClient } from "../db";
import Account from "../models/Account/Account";
import { errorResponse } from "./AccountRouter";
import { ObjectId } from "mongodb";

type RouteParams = {
  _id: string;
};

const cardSetRouter = express.Router({ mergeParams: true });

// Add a card set to an account
cardSetRouter.post("/", async (req, res) => {
  const { _id } = req.params as RouteParams;
  const cardSet = req.body;

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

export default cardSetRouter;
