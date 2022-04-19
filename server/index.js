const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://DDeShon:mypassword@cluster0.4zs5l.mongodb.net/Cluster0?retryWrites=true&w=majority";

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to my app");
});

app.post("/signup", (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("Server running on PORT " + PORT));
