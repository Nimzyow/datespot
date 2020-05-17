const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// init middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/spots", require("./routes/spots"));
app.use("/api/tags", require("./routes/tags"));
app.use("/api/likes", require("./routes/likes"));

module.exports = app;
