const { expect } = require("chai");
const request = require("supertest");

const { createDBUser, generateToken, createSpot } = require("./commonTestCommands.test");

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
  describe("Add new spot", () => {
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
    it("is not successful if no user", async () => {
      const response = await request(app)
        .post("/api/spots")
        .set("Content-Type", "application/json")
        .send(newSpot);
      expect(response.statusCode).to.equal(401);
      expect(response.body.msg).to.equal("No token, Authorization denied");
    });
  });

  it("get all Spots", async () => {
    const secondSpot = {
      title: "a second title",
      description: "a second description",
      url: "www.google.com",
      avgCost: "30",
      summary: "A second summary",
      address: "A second address",
      advice: "A second advice",
    };
    await createSpot();
    await createSpot(secondSpot);

    const response = await request(app)
      .get("/api/spots")
      .set("x-auth-token", token);

    expect(response.statusCode).to.equal(200);
    expect(response.body.length).to.equal(2);
  });

  describe("Delete a spot", () => {
    it("successful", async () => {
      const spot = await createSpot();
      const response = await request(app)
        .delete(`/api/spots/${spot.id}`)
        .set("x-auth-token", token);
      expect(response.statusCode).to.equal(200);
      expect(response.body.msg).to.equal("Deleted spot successfully");
    });
    it("not successful if no user", async () => {
      const spot = await createSpot();
      const response = await request(app)
        .delete(`/api/spots/${spot.id}`);
      expect(response.statusCode).to.equal(401);
      expect(response.body.msg).to.equal("No token, Authorization denied");
    });

    describe("Update a spot", () => {
      it("is successful", async () => {
        const updateTitleOfSpot = {
          title: "THIS SPOT HAS BEEN UPDATED",
        };
        const spot = await createSpot();
        const response = await request(app)
          .patch(`/api/spots/${spot.id}`)
          .set({
            "Content-Type": "application/json",
            "x-auth-token": token,
          })
          .send(updateTitleOfSpot);

        expect(response.statusCode).to.equal(200);
        expect(response.body.title).to.equal("THIS SPOT HAS BEEN UPDATED");
      });
      it("not successful if no user", async () => {
        const updateTitleOfSpot = {
          title: "THIS SPOT HAS BEEN UPDATED",
        };
        const spot = await createSpot();
        const response = await request(app)
          .patch(`/api/spots/${spot.id}`)
          .set("Content-Type", "application/json")
          .send(updateTitleOfSpot);

        expect(response.statusCode).to.equal(401);
        expect(response.body.msg).to.equal("No token, Authorization denied");
      });
    });

    //  PATCH a particular spot
  });
});
