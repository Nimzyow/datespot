const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    allSpots: [Spot!]!
  }
  type Spot {
    _id: ID!
    tags: [String!]!
    title: String!
    description: String!
    location: String!
    url: String!
    summary: String!
    address: String!
    avgCost: String!
    dress: String!
    bestTimes: String!
    advice: String!
    latitude: String!
    longitude: String!
    comments: [Comment!]!
    likes: [Like!]!
  }
  type Comment {
    comment: String!
  }
  type Like {
    _id: ID!
    userId: String!
    date: String!
    createdAt: String!
    updatedAt: String!
  }
  type Token {
    token: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createUser(email: String!, username: String!, password: String!): Token!
    loginUser(email: String!, password: String!): Token!
    loadUser(token: String!): User!
  }
`;
