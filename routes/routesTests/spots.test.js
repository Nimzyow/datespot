const { expect } = require("chai");
const request = require("supertest");

const { createDBUser, generateToken } = require("./commonTestCommands.test");

const app = require("../../server");

describe("Spots routes", async () => {
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
  describe("error checking", () => {
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
    it("for aveCost", async () => {
      const expectedError = [{
        location: "body",
        msg: "Please enter an average cost",
        param: "avgCost",
      }];

      delete newSpot.avgCost;
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
    it("for summary", async () => {
      const expectedError = [{
        location: "body",
        msg: "Please enter a summary",
        param: "summary",
      }];

      delete newSpot.summary;
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
    it("for address", async () => {
      const expectedError = [{
        location: "body",
        msg: "Please enter an address",
        param: "address",
      }];

      delete newSpot.address;
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
    it("for advice", async () => {
      const expectedError = [{
        location: "body",
        msg: "Please enter an advice for this spot",
        param: "advice",
      }];

      delete newSpot.advice;
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
  });
  describe("add new spot", () => {
    it("successful", async () => {
      const response = await request(app)
        .post("/api/spots")
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        })
        .send(newSpot);

      expect(response.statusCode).to.equal(200);
      expect(response.body.address).to.equal(newSpot.address);
      expect(response.body.advice).to.equal(newSpot.advice);
    });
  });
  it("is not successful if no user", async () => {
    const response = await request(app)
      .post("/api/spots")
      .set("Content-Type", "application/json")
      .send(newSpot);
    expect(response.statusCode).to.equal(401);
    expect(response.body.msg).to.equal("No token, Authorization denied");
  });


  //  GET all spots
  //    - test for 200 status and return of spots
  //  PATCH a particular spot
  //  POST add a new like to spots
  //  DELETE a spot
});
