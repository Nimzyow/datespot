const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express();

//Connect Database
connectDB();

//init middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/spots", require("./routes/spots"));
app.use("/api/tags", require("./routes/tags"));
app.use("/api/likes", require("./routes/likes"));

app.get("/", (req, res) => {
  res.json({ msg: "Hello world!" });
});

module.exports = app;
