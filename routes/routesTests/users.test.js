const { assert, expect } = require("chai");
const request = require("supertest");

const db = require("../../config/db");
const app = require("../../server");

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
    // check for errors when missing email, username or password
    describe("Credential errors", () => {
      it("for username", (done) => {
        // db.cleanDatabase();
        delete newUser.username;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please add a username",
            param: "username",
          },
        ];
        request(app)
          .post("/api/users")
          .send(newUser)
          .end((err, res) => {
            if (err) {
              assert.fail(0, 1, "Did not fail an expected fail");
            }
            expect(res.statusCode).to.equal(400);
            expect(res.body.errors).to.deep.equal(expectedErrorMsg);
            done();
          });
      });
    });
  });
});
