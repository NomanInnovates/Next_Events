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

    const res = await insertDoc(client, "comments", newComment);
    console.log("insert cmt res", res);
    res.status(422).json({ message: "Invalid Input !" });
    client.res.status(201).json({ message: "Added Comment!", newComment });
  }
  if (req.method === "GET") {
    try {
      const documents = await getAllDocs(client, "comments", { _id: -1 });
      res.send({ comments: documents });
    } catch (err) {
      console.log("GEt chala ", documents);
      client.close();
    }
  }
}

export default handler;
