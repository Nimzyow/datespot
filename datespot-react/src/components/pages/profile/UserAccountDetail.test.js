import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr } from "../../../test/TestUtils";

import UserAccountDetail from "./UserAccountDetail";

describe("UserAccountDetail.js", () => {
  const defaultProps = {
    user: { email: "user@user.com", username: "username" },
  };

  const setup = () => {
    return shallow(<UserAccountDetail {...defaultProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const userAccountDetailContainer = findTestByAttr(wrapper, "uad-container");

    expect(userAccountDetailContainer.length).toBe(1);
  });
  describe("displays", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("header", () => {
      const headerElement = findTestByAttr(wrapper, "header-element");

      expect(headerElement.length).toBe(1);
      expect(headerElement.text()).toBe("Your Account");
    });
    test("email", () => {
      const emailElement = findTestByAttr(wrapper, "email-element");

      expect(emailElement.length).toBe(1);
      expect(emailElement.text()).toBe(defaultProps.user.email);
    });
    test("username", () => {
      const usernameElement = findTestByAttr(wrapper, "username-element");

      expect(usernameElement.length).toBe(1);
      expect(usernameElement.text()).toBe(defaultProps.user.username);
    });
  });
});
