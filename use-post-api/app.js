const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");
var bodyParser = require("body-parser");
const hostname = "127.0.0.1";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Trong tệp gốc 
const userRoutes = require("./routes/user.routes");

// Sử dụng routes
app.use("/api/v1/users", userRoutes);

// Trong tệp gốc 
const postRoutes = require("./routes/posts.routes");

// Sử dụng routes
app.use("/api/v1/posts", postRoutes);




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
