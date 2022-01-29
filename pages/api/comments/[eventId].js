import { MongoClient } from "mongodb";

async function handler(req, res) {
  let { eventId } = req.query;
  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin123@cluster0.u9jej.mongodb.net/events?retryWrites=true&w=majority"
  );
  const db = client.db();
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
    }
    console.log("user name", name);
    console.log("user email", email);
    console.log("user text", text);
    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    const res = await db.collection("comments").insertOne(newComment);
    console.log("insert cmt res", res);
    res.status(422).json({ message: "Invalid Input !" });
    client.res.status(201).json({ message: "Added Comment!", newComment });
  }
  if (req.method === "GET") {
    const dummyComment = [
      {
        id: "cs324",
        name: "Max",
        text: "Firsts Comment",
      },
      {
        id: "cs325",
        name: "Maxii",
        text: "Second Comment",
      },
    ];
    const documents = await db.collection("comments").find().sort().toArray();
    console.log("GEt chala ", dummyComment);
    res.send({ comments: dummyComment });
  }
  client.close();
}

export default handler;
