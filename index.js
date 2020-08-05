const app = require("./server");
const db = require("./config/db");
const path = require("path");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolver");

db.connect();

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("datespot-react/build"));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "datespot-react", "build", "index.html"),
    ),
  );
}

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Listening on Port ${PORT}` + server.graphqlPath),
);
