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
  it("can add 2 comments", async () => {
    const user = await createDBUser();
    const newSpot = {
      title: "a default title",
      description: "a default description",
      url: "www.google.com",
      avgCost: "30",
      summary: "A default summary",
      address: "A default address",
      advice: "A default advice",
      comments: [{ userId: user.id, comment: "This is the first greatest comment in the world" }],
    };

    const token = await generateToken(user.id);
    const spot = await createSpot(newSpot);

    const userComment = {
      comment: "This is the second greatest comment in the world",
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
    expect(response.body.spot.comments.length).to.equal(2);
  });
});
