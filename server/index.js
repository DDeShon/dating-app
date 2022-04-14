const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
// const uri =

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to my app");
});

app.get("/signup", (req, res) => {
  res.json("Welcome to my app");
});

app.listen(PORT, () => console.log("Server running on PORT " + PORT));
