import * as functions from "firebase-functions";
import { MongoClient } from "mongodb";

const uri: string = functions.config().mongodb.uri;

const client = new MongoClient(uri);

export const getMongoClient = async (): Promise<MongoClient> => {
  await client.connect();
  return client;
};
