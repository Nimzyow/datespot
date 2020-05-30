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
    jest.clearAllMocks();
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
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("filling in email triggers onChange", () => {
      let emailInput = findTestByAttr(wrapper, "email-input");

      emailInput.simulate("change", {
        target: { name: "email", value: "test@test.com" },
      });

      emailInput = findTestByAttr(wrapper, "email-input");

      expect(emailInput.props().value).toBe("test@test.com");
    });
    test("filling in password triggers onChange", () => {
      let passwordInput = findTestByAttr(wrapper, "password-input");

      passwordInput.simulate("change", {
        target: { name: "password", value: "123456" },
      });

      passwordInput = findTestByAttr(wrapper, "password-input");

      expect(passwordInput.props().value).toBe("123456");
    });
    test("filling in email and password triggers login function", () => {
      let emailInput = findTestByAttr(wrapper, "email-input");
      emailInput.simulate("change", {
        target: { name: "email", value: "test@test.com" },
      });

      let passwordInput = findTestByAttr(wrapper, "password-input");
      passwordInput.simulate("change", {
        target: { name: "password", value: "123456" },
      });

      const submitButton = findTestByAttr(wrapper, "submit-button");
      submitButton.simulate("click");

      expect(login).toHaveBeenCalledTimes(1);
    });
    test("filling only email triggers setAlert function once", () => {
      let emailInput = findTestByAttr(wrapper, "email-input");

      emailInput.simulate("change", {
        target: { name: "email", value: "test@test.com" },
      });

      const submitButton = findTestByAttr(wrapper, "submit-button");
      submitButton.simulate("click");

      expect(setAlert).toHaveBeenCalledTimes(1);
    });
    test("filling only password triggers setAlert function once", () => {
      let passwordInput = findTestByAttr(wrapper, "password-input");

      passwordInput.simulate("change", {
        target: { name: "password", value: "123456" },
      });

      const submitButton = findTestByAttr(wrapper, "submit-button");
      submitButton.simulate("click");

      expect(setAlert).toHaveBeenCalledTimes(1);
    });
    test("Submitting no email or password triggers setAlert function once", () => {
      const submitButton = findTestByAttr(wrapper, "submit-button");
      submitButton.simulate("click");

      expect(setAlert).toHaveBeenCalledTimes(1);
    });
  });
});

//nothing filled in will call setAlert function once

//triggering login function will display spinner
