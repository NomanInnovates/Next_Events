function handler(req, res) {
  let { eventId } = req.query;

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
    console.log("user email", email);
    res.status(201).json({ message: "Signed Up!" });
  }
  if (req.method === "GET") {
  }
}

export default handler;
