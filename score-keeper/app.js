const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
var bodyParser = require("body-parser");
const hostname = "127.0.0.1";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./public/index.html");
});

app.get("/player", (req, res) => {
  res.sendFile(__dirname + "/public/player.html");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
