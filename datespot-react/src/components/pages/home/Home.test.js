import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr } from "../../../test/TestUtils";

import { Home } from "./Home";

describe.only("Home.js", () => {
  const setup = () => {
    return shallow(<Home />);
  };
  test("renders without error", () => {
    const wrapper = setup();
    const homeContainer = findTestByAttr(wrapper, "home-container");

    expect(homeContainer.length).toBe(1);
  });
  describe("displays", () => {
    test("image", () => {
      const wrapper = setup();
      const imageContainer = findTestByAttr(wrapper, "image-container");

      expect(imageContainer.length).toBe(1);
    });
    test("sign in button", () => {
      const wrapper = setup();
      const signInButton = findTestByAttr(wrapper, "sign-in-button");

      expect(signInButton.length).toBe(1);
    });
    test("register button", () => {
      const wrapper = setup();
      const registerButton = findTestByAttr(wrapper, "register-button");

      expect(registerButton.length).toBe(1);
    });
  });
});
