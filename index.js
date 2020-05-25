const app = require("./server");
const db = require("./config/db");
const path = require("path")
const express = require("express")

db.connect();

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("datespot-react/build"));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "datespot-react", "build", "index.html")));
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
