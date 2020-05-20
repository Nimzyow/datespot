const { expect } = require("chai");
const request = require("supertest");

const { createDBUser } = require("./commonTestCommands.test");

const app = require("../../server");

describe("spots routes", () => {
  // tests taht we want to perform:

  //  POST add a new spot
  //    - error checking
  //  GET all spots
  //    - test for 200 status and return of spots
  //  PATCH a particular spot
  //  POST add a new like to spots
  //  DELETE a spot

});
