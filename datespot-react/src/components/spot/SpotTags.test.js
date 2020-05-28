import React from "react";
import { shallow } from "enzyme";

import { SpotTags } from "./SpotTags";

import { findTestByAttr } from "../../test/TestUtils";

describe("SpotTags.js", () => {
  let loadUser = jest.fn();
  let getTags = jest.fn();
  const defaultProps = {
    loadUser: loadUser,
    getTags: getTags,
    tag: {
      tags: [
        {
          _id: "someID",
          tag: "Adventure",
        },
      ],
    },
  };

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<SpotTags {...setupProps} />);
  };

  describe("Renders without error", () => {
    test("SpotTags container", () => {
      const wrapper = setup();
      const container = findTestByAttr(wrapper, "spot-tags-container");
      expect(container.length).toBe(1);
    });
  });
});
