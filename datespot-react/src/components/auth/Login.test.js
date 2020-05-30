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
});

//renders login without error

// displays image

// displays email input

//displays passowrd input

//displays submit button

//displays never signed up message

//typing in email triggers onChange with value change

//typing in password triggers onChange with value change

//fill in email and password and submitting calls login function once

//only email filled in will call setAlert function once

//only password filled in will call setAlert function once

//nothing filled in will call setAlert function once

//triggering login function will display spinner
