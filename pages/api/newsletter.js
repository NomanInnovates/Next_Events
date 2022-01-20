function newletter(req, res) {
  if (req.method === "POST") {
    let { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }
    console.log("user email", email);
    res.status(201).json({ message: "Signed Up!" });
  }
}

export default newletter;
