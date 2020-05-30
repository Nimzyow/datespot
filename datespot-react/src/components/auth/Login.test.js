import React from "react";
import { shallow } from "enzyme";

import { findTestByAttr } from "../../test/TestUtils";

import { Login } from "./Login";

describe("Login.js", () => {
  let login = jest.fn();
  let clearErrors = jest.fn();
  let setAlert = jest.fn();
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      login,
      clearErrors,
      setAlert,
      auth: {
        error: {},
        isAuthenticated: {},
        spinner: null,
      },
    };
  });

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Login {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const loginContainer = findTestByAttr(wrapper, "login-container");

    expect(loginContainer.length).toBe(1);
  });

  describe("displays", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("image", () => {
      const imageElement = findTestByAttr(wrapper, "image-element");

      expect(imageElement.length).toBe(1);
    });
    test("email input", () => {
      const emailInput = findTestByAttr(wrapper, "email-input");

      expect(emailInput.length).toBe(1);
    });
    test("password input", () => {
      const passwordInput = findTestByAttr(wrapper, "password-input");

      expect(passwordInput.length).toBe(1);
    });
    test("submit button", () => {
      const submitButton = findTestByAttr(wrapper, "submit-button");

      expect(submitButton.length).toBe(1);
    });
    test("never signed up message", () => {
      const signUpMessage = findTestByAttr(wrapper, "sign-up-mess");

      expect(signUpMessage.length).toBe(1);
    });
  });
  describe("form functionality", () => {
    test("filling in email triggers onChange", () => {
      const wrapper = setup();
      let emailInput = findTestByAttr(wrapper, "email-input");

      emailInput.simulate("change", {
        target: { name: "email", value: "test@test.com" },
      });

      emailInput = findTestByAttr(wrapper, "email-input");

      expect(emailInput.props().value).toBe("test@test.com");
    });
  });
});

//typing in email triggers onChange with value change

//typing in password triggers onChange with value change

//fill in email and password and submitting calls login function once

//only email filled in will call setAlert function once

//only password filled in will call setAlert function once

//nothing filled in will call setAlert function once

//triggering login function will display spinner
