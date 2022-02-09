import { connectToDb, getAllDocs, insertDoc } from "../../../helpers/dbUtil";

async function handler(req, res) {
  let { eventId } = req.query;
  let client;
  try {
    client = await connectToDb();
  } catch (err) {
    res.status(500).json({ message: "Connecting to db failed" });
    return;
  }

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
      res.status(422).json({ message: "Invalid Input !" });
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };
    try {
      const result = await insertDoc(client, "comments", newComment);
      res.status(201).json({ message: "Added Comment!", newComment });
    } catch (err) {
      res.status(500).json({ message: "server exception", Error: err });
    }
  }
  if (req.method === "GET") {
    try {
      const documents = await getAllDocs(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (err) {
      client.close();
    }
  }
}

export default handler;
