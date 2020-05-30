import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr } from "../../test/TestUtils";

import Header from "./Header";

describe("Spot.js", () => {
  const setup = () => {
    return shallow(<Header />);
  };

  describe("displays in Spot page", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("a jumbotron", () => {
      const jumbotron = findTestByAttr(wrapper, "jumbotron");

      expect(jumbotron.length).toBe(1);
    });

    test("profile header element", () => {
      const profileHeader = findTestByAttr(wrapper, "profile-header");

      expect(profileHeader.length).toBe(1);
      expect(profileHeader.text()).toBe("Profile");
    });
  });
});
