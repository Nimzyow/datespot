const { assert, expect } = require("chai");
const request = require("supertest");

const db = require("../../config/db");
const app = require("../../server");

describe("users routes", () => {
  describe("POST new user", () => {
    let newUser;

    beforeEach(() => {
      db.cleanDatabase();
      newUser = {
        email: "test@test.com",
        username: "testy",
        password: "testpassword",
      };
    });
    // check for errors when missing email, username or password
    describe("Credential errors", () => {
      it("for username", (done) => {
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
      it("for email", (done) => {
        delete newUser.email;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please include a valid email",
            param: "email",
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
      it("for password", (done) => {
        delete newUser.password;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter a password",
            param: "password",
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
    it("successful response", (done) => {
      request(app)
        .post("/api/users")
        .send(newUser)
        .set("Context-Type", "application/json")
        .end((err, res) => {
          if (err) {
            assert.fail(0, 1, "Did not fail an expected fail");
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body.token).to.be.a("string");
          done();
        });
    });
    it("twice with same email error", (done) => {
      request(app)
        .post("/api/users")
        .send(newUser)
        .set("Content-Type", "application/json")
        .end((err) => {
          if (err) {
            assert.fail(0, 1, "Did not fail an expected fail");
          }
          request(app)
            .post("/api/users")
            .send(newUser)
            .set("Content-Type", "application/json")
            .end((error, res) => {
              if (error) {
                assert.fail(0, 1, "Did not fail an expected fail");
              }
              expect(res.statusCode).to.equal(401);
              done();
            });
        });
    });
  });
});
