const axios = require("axios");

module.exports = {
  Query: {
    allSpots: async () => {
      const result = await axios.default.get(`http://localhost:4000/api/spots`);
      return result;
    },
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
  },
};
