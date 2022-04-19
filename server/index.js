const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://DDeShon:mypassword@cluster0.4zs5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to my app");
});

app.get("/signup", (req, res) => {
  res.json("Welcome to my app");
});

app.listen(PORT, () => console.log("Server running on PORT " + PORT));
