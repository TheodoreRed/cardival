import express from "express";
import { getMongoClient } from "../db";
import Account from "../models/Account/Account";
import CardSetRouter from "./CardRouter";

const router = express.Router();

export const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// get account by google uid
router.get("/accounts/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const client = await getMongoClient();
    const accountCollection = client.db().collection<Account>("accounts");
    const user = await accountCollection.findOne({ uid });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User not found with ${uid}` });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

// create new account given an Account object
router.post("/accounts", async (req, res) => {
  const account: Account = req.body;
  try {
    const client = await getMongoClient();
    const accountCollection = client.db().collection<Account>("accounts");
    await accountCollection.insertOne(account);

    res.status(201).json(account);
  } catch (err) {
    errorResponse(err, res);
  }
});

router.use("/accounts/:_id/card-sets", CardSetRouter);

export default router;
