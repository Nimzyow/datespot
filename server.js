const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//init middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/spots", require("./routes/spots"));
app.use("/api/tags", require("./routes/tags"));
app.use("/api/likes", require("./routes/likes"))

app.get("/", (req, res) => {
  res.json({ msg: "Hello world!" });
});

module.exports = app;
