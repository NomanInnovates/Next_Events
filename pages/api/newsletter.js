import { MongoClient } from "mongodb";
async function newletter(req, res) {
  if (req.method === "POST") {
    let { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }
    const client = await MongoClient.connect(
      "mongodb+srv://admin:admin123@cluster0.u9jej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();
    await db.collection("newsletter").insertOne({ email: email });
    client.close();
    console.log("user email", email);
    res.status(201).json({ message: "Signed Up!" });
  }
}

export default newletter;
