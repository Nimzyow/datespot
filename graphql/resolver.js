const axios = require("axios");

module.exports = {
  Query: {
    hello: () => "hello world",
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios.default.post(
        "http://localhost:4000/api/users",
        { email, username, password },
        config,
      );
      return result.data;
    },
    loginUser: async (parent, { email, password }) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios.default.post(
        "http://localhost:4000/api/auth",
        { email, password },
        config,
      );
      return result.data;
    },
    loadUser: async (parent, { token }) => {
      const tokenToSend = token;
      const config = { headers: { "x-auth-token": tokenToSend } };
      const result = await axios.default.get(
        `http://localhost:4000/api/auth`,
        config,
      );
      return result.data;
    },
    allSpots: async (parent, { token }) => {
      const tokenToSend = token;
      const config = { headers: { "x-auth-token": tokenToSend } };
      const result = await axios.default.get(
        `http://localhost:4000/api/spots`,
        config,
      );
      return result.data;
    },
  },
};
