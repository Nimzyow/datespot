const { expect } = require("chai");
const request = require("supertest");

const { createDBUser, generateToken, createSpot } = require("./commonTestCommands.test");

const app = require("../../server");

describe("Comments route", () => {
  it("can add a comment", async () => {
    const user = await createDBUser();
    const token = await generateToken(user.id);
    const spot = await createSpot();

    const userComment = {
      comment: "This is the greatest comment in the world",
    };

    const response = await request(app)
      .post(`/api/spots/${spot.id}/comments`)
      .set({
        "Content-Type": "application/json",
        "x-auth-token": token,
      })
      .send(userComment);

    expect(response.statusCode).to.equal(200);
    expect(response.body.msg).to.equal("Comment added to spot");
  });
});
