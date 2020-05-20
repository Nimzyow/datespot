const { expect } = require("chai");
const request = require("supertest");

const { createDBUser } = require("./commonTestCommands.test");

const app = require("../../server");

describe("auth routes", () => {
  let newUser;
  beforeEach(() => {
    newUser = {
      email: "test@test.com",
      username: "testy",
      password: "testpassword",
    };
  });
  describe("Log in user", async () => {
    describe("credential check", () => {
      it("for password only", async () => {
        delete newUser.email;
        delete newUser.username;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "please enter a valid email",
            param: "email",
          },
        ];
        const response = await request(app)
          .post("/api/auth")
          .set("Content-Type", "application/json")
          .send(newUser);

        expect(response.statusCode).to.equal(400);
        expect(response.body.errors).to.deep.equal(expectedErrorMsg);
      });
      it("for email only", async () => {
        delete newUser.password;
        delete newUser.username;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter password",
            param: "password",
          },
        ];
        const response = await request(app)
          .post("/api/auth")
          .set("Content-Type", "application/json")
          .send(newUser);

        expect(response.statusCode).to.equal(400);
        expect(response.body.errors).to.deep.equal(expectedErrorMsg);
      });
    });

    it("success", async () => {
      await createDBUser(newUser);

      delete newUser.username;

      const response = await request(app)
        .post("/api/auth")
        .set("Content-Type", "application/json")
        .send(newUser);

      expect(response.statusCode).to.equal(200);
      expect(response.body.token).to.be.a("string");
    });

    it("not successfull with wrong email", async () => {
      await createDBUser(newUser);

      delete newUser.username;
      newUser.email = "notRightEmail@test.com";
      const response = await request(app)
        .post("/api/auth")
        .set("Content-Type", "application/json")
        .send(newUser);

      expect(response.statusCode).to.equal(401);
      expect(response.body.msg).to.equal("Invalid credentials");
    });
  });
});
