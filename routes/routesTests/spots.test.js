const { expect } = require("chai");
const request = require("supertest");

const { createDBUser, generateToken } = require("./commonTestCommands.test");

const app = require("../../server");

describe("Spots routes", async () => {
  // tests taht we want to perform:

  //  POST add a new spot
  //    - error checking
  describe("error checking", () => {
    let newSpot;
    let user;
    let token;
    beforeEach(async () => {
      newSpot = {
        title: "a default title",
        description: "a default description",
        url: "www.google.com",
        avgCost: "30",
        summary: "A default summary",
        address: "A default address",
        advice: "A default advice",
      };
      user = await createDBUser();
      token = await generateToken(user.id);
    });
    it("for title", async () => {
      const expectedError = [{
        location: "body",
        msg: "Please enter a title",
        param: "title",
      }];

      delete newSpot.title;

      const response = await request(app)
        .post("/api/spots")
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        })
        .send(newSpot);

      expect(response.statusCode).to.equal(400);
      expect(response.body.errors).to.deep.equal(expectedError);
    });
    it("for description", async () => {
      const expectedError = [{
        location: "body",
        msg: "Please enter a description",
        param: "description",
      }];

      delete newSpot.description;

      const response = await request(app)
        .post("/api/spots")
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        })
        .send(newSpot);

      expect(response.statusCode).to.equal(400);
      expect(response.body.errors).to.deep.equal(expectedError);
    });
    it("for url", async () => {
      const expectedError = [{
        location: "body",
        msg: "Please enter a url to an image",
        param: "url",
      }];

      delete newSpot.url;
      const response = await request(app)
        .post("/api/spots")
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        })
        .send(newSpot);

      expect(response.statusCode).to.equal(400);
      expect(response.body.errors).to.deep.equal(expectedError);
    });
    // it("for aveCost", () => {

    // });
    // it("for summary", () => {

    // });
    // it("for address", () => {

    // });
    // it("for advice", () => {

    // });
  });
  // describe.skip('add new spot', () => {
  //   it('succesfull', () => {

  //   });
  // });


  //  GET all spots
  //    - test for 200 status and return of spots
  //  PATCH a particular spot
  //  POST add a new like to spots
  //  DELETE a spot
});
