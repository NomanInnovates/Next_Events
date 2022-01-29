import { MongoClient } from "mongodb";
import { connectToDb, insertDoc } from "../../helpers/dbUtil";

async function newletter(req, res) {
  if (req.method === "POST") {
    let { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }
    let client;
    try {
      client = await connectToDb();
    } catch (err) {
      res.status(500).json({ message: "conneting to database failed" });
      console.log("err connenting to database", err);
      return;
    }
    try {
      await insertDoc(client, "emails", { email });

      client.close();
    } catch (err) {
      res.status(500).json({ message: "conneting to database failed" });
      console.log("err inserting to database", err);
      return;
    }

    client.close();
    console.log("user email", email);
    res.status(201).json({ message: "Signed Up!" });
  }
}

export default newletter;
