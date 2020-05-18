const { assert, expect } = require("chai");
const request = require("supertest");

const db = require("../../config/db");
const app = require("../../server");

describe("auth routes", () => {
  let newUser;
  beforeEach(() => {
    db.cleanDatabase();
    newUser = {
      email: "test@test.com",
      username: "testy",
      password: "testpassword",
    };
  });
  describe("Log in user", () => {
    describe("credential check", () => {
      it("for password only", (done) => {
        delete newUser.email;
        delete newUser.username;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "please enter a valid email",
            param: "email",
          },
        ];
        request(app)
          .post("/api/auth")
          .set("Content-Type", "application/json")
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
      it("for email only", (done) => {
        delete newUser.password;
        delete newUser.username;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter password",
            param: "password",
          },
        ];
        request(app)
          .post("/api/auth")
          .set("Content-Type", "application/json")
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
    describe("credential check", () => {
      it("for password only", (done) => {
        delete newUser.email;
        delete newUser.username;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "please enter a valid email",
            param: "email",
          },
        ];
        request(app)
          .post("/api/auth")
          .set("Content-Type", "application/json")
          .send(newUser)
          .end((err, res) => {
            if (err) {
              assert.fail(0, 1, "Did not fail an expected fail");
            }
            expect(res.statusCode).to.equal(400);
            expect(res.body.errors).to.deep.equal(expectedErrorMsg);
          });
        done();
      });
      it("for email only", (done) => {
        delete newUser.password;
        delete newUser.username;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter password",
            param: "password",
          },
        ];
        request(app)
          .post("/api/auth")
          .set("Content-Type", "application/json")
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
    it("success", (done) => {
      request(app)
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .end((err) => {
          if (err) {
            assert.fail(0, 1, "Did not fail an expected fail");
          }
          delete newUser.username;
          request(app)
            .post("/api/auth")
            .set("Content-Type", "application/json")
            .send(newUser)
            .end((error, res) => {
              if (error) {
                assert.fail(0, 1, "Did not fail an expected fail");
              }
              expect(res.statusCode).to.equal(200);
              expect(res.body.token).to.be.a("string");
              done();
            });
        });
    });
    it("not successfull with wrong email", (done) => {
      request(app)
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .end((err) => {
          if (err) {
            assert.fail(0, 1, "Did not fail an expected fail");
          }
          delete newUser.username;
          newUser.email = "notRightEmail@test.com";
          request(app)
            .post("/api/auth")
            .set("Content-Type", "application/json")
            .send(newUser)
            .end((error, res) => {
              if (error) {
                assert.fail(0, 1, "Did not fail an expected fail");
              }
              expect(res.statusCode).to.equal(401);
              expect(res.body.msg).to.equal("Invalid credentials");
              done();
            });
        });
    });
  });
});
