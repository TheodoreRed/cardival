import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import accountRouter from "./routes/AccountRouter";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/", accountRouter);

export const api = functions.https.onRequest(app);
