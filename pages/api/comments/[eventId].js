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
    console.log("user name", name);
    console.log("user email", email);
    console.log("user text", text);
    const newComment = {
      id: new Date().toString(),
      email,
      name,
      text,
    };
    res.status(201).json({ message: "Added Comment!", newComment });
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
    console.log("GEt chala ", dummyComment);
    res.send({ comments: dummyComment });
  }
}

export default handler;
