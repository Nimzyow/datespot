import React from "react";
import { shallow } from "enzyme";

import { findTestByAttr } from "../../test/TestUtils";

import { Register } from "./Register";

describe("Register.js", () => {
  let register = jest.fn();
  let clearErrors = jest.fn();
  let setAlert = jest.fn();
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      register,
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
    return shallow(<Register {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const registerContainer = findTestByAttr(wrapper, "register-container");

    expect(registerContainer.length).toBe(1);
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
    test("username input", () => {
      const usernameInput = findTestByAttr(wrapper, "username-input");

      expect(usernameInput.length).toBe(1);
    });
    test("email input", () => {
      const emailInput = findTestByAttr(wrapper, "email-input");

      expect(emailInput.length).toBe(1);
    });
    test("password input", () => {
      const passwordInput = findTestByAttr(wrapper, "password-input");

      expect(passwordInput.length).toBe(1);
    });
    test("confirm password input", () => {
      const password2Input = findTestByAttr(wrapper, "password2-input");

      expect(password2Input.length).toBe(1);
    });
    test("submit button", () => {
      const submitButton = findTestByAttr(wrapper, "submit-button");

      expect(submitButton.length).toBe(1);
    });
    test("sign in message", () => {
      const signInMessage = findTestByAttr(wrapper, "sign-in-mess");

      expect(signInMessage.length).toBe(1);
    });
  });

  describe("form functionality", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("filling in username triggers onChange", () => {
      let usernameInput = findTestByAttr(wrapper, "username-input");

      usernameInput.simulate("change", {
        target: { name: "username", value: "testy" },
      });

      usernameInput = findTestByAttr(wrapper, "username-input");

      expect(usernameInput.props().value).toBe("testy");
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
    test("filling in confirm password triggers onChange", () => {
      let confirmPasswordInput = findTestByAttr(wrapper, "password2-input");

      confirmPasswordInput.simulate("change", {
        target: { name: "password2", value: "123456" },
      });

      confirmPasswordInput = findTestByAttr(wrapper, "password2-input");

      expect(confirmPasswordInput.props().value).toBe("123456");
    });
    test("filling in username, email, password and confirm password triggers register function", () => {
      let usernameInput = findTestByAttr(wrapper, "username-input");
      usernameInput.simulate("change", {
        target: { name: "username", value: "testy" },
      });

      let emailInput = findTestByAttr(wrapper, "email-input");
      emailInput.simulate("change", {
        target: { name: "email", value: "test@test.com" },
      });

      let passwordInput = findTestByAttr(wrapper, "password-input");
      passwordInput.simulate("change", {
        target: { name: "password", value: "123456" },
      });

      let passwordConfirmInput = findTestByAttr(wrapper, "password2-input");
      passwordConfirmInput.simulate("change", {
        target: { name: "password2", value: "123456" },
      });

      const submitButton = findTestByAttr(wrapper, "submit-button");
      submitButton.simulate("click");

      expect(register).toHaveBeenCalledTimes(1);
    });
    test("triggering register function calls spinner", () => {
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

      const spinnerElement = findTestByAttr(wrapper, "spinner-element");

      expect(spinnerElement.length).toBe(1);
    });
    test("filling only username triggers setAlert function once", () => {
      let usernameInput = findTestByAttr(wrapper, "username-input");
      usernameInput.simulate("change", {
        target: { name: "username", value: "testy" },
      });

      const submitButton = findTestByAttr(wrapper, "submit-button");
      submitButton.simulate("click");

      expect(setAlert).toHaveBeenCalledTimes(1);
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
    test("filling only confirm password triggers setAlert function once", () => {
      let password2Input = findTestByAttr(wrapper, "password2-input");

      password2Input.simulate("change", {
        target: { name: "password2", value: "123456" },
      });

      const submitButton = findTestByAttr(wrapper, "submit-button");
      submitButton.simulate("click");

      expect(setAlert).toHaveBeenCalledTimes(1);
    });
    test("Submitting no username, email, password and confirm password triggers setAlert function once", () => {
      const submitButton = findTestByAttr(wrapper, "submit-button");
      submitButton.simulate("click");

      expect(setAlert).toHaveBeenCalledTimes(1);
    });
  });
});
