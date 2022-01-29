import { MongoClient } from "mongodb";

export async function connectToDb() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin123@cluster0.u9jej.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}
export async function insertDoc(client, collection, doc) {
  const db = client.db();
  const res = await db.collection(collection).insertOne(doc);
  return res;
}

export async function getAllDocs(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return res;
}
