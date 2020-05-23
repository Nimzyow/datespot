const { expect } = require("chai");
const request = require("supertest");

const { createDBUser, createSpot, generateToken } = require("./commonTestCommands.test");
const app = require("../../server");


//  POST add a new like to spots
describe("Like routes", async () => {
  it("add a like to a spot", async () => {
    const user = await createDBUser();
    const spot = await createSpot();
    const token = await generateToken(user.id);

    const userLikesPost = {
      userId: user.id,
    };

    const response = await request(app)
      .post(`/api/spots/${spot.id}/like`)
      .set({
        "Content-Type": "application/json",
        "x-auth-token": token,
      })
      .send(userLikesPost);

    expect(response.statusCode).to.equal(200);
    expect(response.body.likes.length).to.equal(1);
    expect(response.body.likes[0].userId).to.equal(user.id);
  });

  it("take away a like from a spot", async () => {
    const user = await createDBUser();
    const token = await generateToken(user.id);

    const newSpot = {
      title: "a default title",
      description: "a default description",
      url: "www.google.com",
      avgCost: "30",
      summary: "A default summary",
      address: "A default address",
      advice: "A default advice",
      likes: [{ userId: user.id }],
    };

    const spot = await createSpot(newSpot);

    const response = await request(app)
      .post(`/api/spots/${spot.id}/likeRemove`)
      .set({
        "Content-Type": "application/json",
        "x-auth-token": token,
      });

    expect(response.statusCode).to.equal(200);
    expect(response.body.likes.length).to.equal(0);
    expect(response.body.likes).to.deep.equal([]);
  });
  it("Can't dislike someone elses like", async () => {
    const newUser = {
      email: "test@test.com",
      username: "testy",
      password: "testpassword",
    };

    const user = await createDBUser();

    const secondUser = await createDBUser(newUser);

    const secondUserToken = await generateToken(secondUser.id);

    const newSpot = {
      title: "a default title",
      description: "a default description",
      url: "www.google.com",
      avgCost: "30",
      summary: "A default summary",
      address: "A default address",
      advice: "A default advice",
      likes: [{ userId: user.id }],
    };

    const spot = await createSpot(newSpot);

    const response = await request(app)
      .post(`/api/spots/${spot.id}/likeRemove`)
      .set({
        "Content-Type": "application/json",
        "x-auth-token": secondUserToken,
      });

    expect(response.body.msg).to.equal("Can't unlike something you haven't liked");
  });
});