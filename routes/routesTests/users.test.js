const { expect } = require("chai");
const request = require("supertest");

const app = require("../../server");

const { createDBUser } = require("./commonTestCommands.test");

describe("users routes", () => {
  describe("POST new user", () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        email: "test@test.com",
        username: "testy",
        password: "testpassword",
      };
    });

    describe("Credential errors", () => {
      it("for username", async () => {
        delete newUser.username;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please add a username",
            param: "username",
          },
        ];
        const response = await request(app)
          .post("/api/users")
          .send(newUser);

        expect(response.statusCode).to.equal(400);
        expect(response.body.errors).to.deep.equal(expectedErrorMsg);
      });
      it("for email", async () => {
        delete newUser.email;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please include a valid email",
            param: "email",
          },
        ];
        const response = await request(app)
          .post("/api/users")
          .send(newUser);

        expect(response.statusCode).to.equal(400);
        expect(response.body.errors).to.deep.equal(expectedErrorMsg);
      });
      it("for password", async () => {
        delete newUser.password;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter a password",
            param: "password",
          },
        ];
        const response = await request(app)
          .post("/api/users")
          .send(newUser);

        expect(response.statusCode).to.equal(400);
        expect(response.body.errors).to.deep.equal(expectedErrorMsg);
      });
    });
    it("successful response", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(newUser);


      expect(response.statusCode).to.equal(200);
      expect(response.body.token).to.be.a("string");
    });

    it("twice with same email error", async () => {
      await createDBUser(newUser);

      const response = await request(app)
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(newUser);
      expect(response.statusCode).to.equal(401);
    });
  });
});
