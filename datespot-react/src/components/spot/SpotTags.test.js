import React from "react";
import { shallow } from "enzyme";

import { SpotTags } from "./SpotTags";

import { findTestByAttr } from "../../test/TestUtils";

describe("SpotTags.js", () => {
  let loadUser = jest.fn();
  let getTags = jest.fn();
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
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
  });

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
  describe("displays", () => {
    test("2 tag items", () => {
      defaultProps.tag.tags.push({
        _id: "secondID",
        tag: "Japanese",
      });
      const wrapper = setup();
      const tagItemElement = findTestByAttr(wrapper, "tag-item-container");
      expect(tagItemElement.length).toBe(2);
    });
    test("spinner while loading tags", () => {
      defaultProps.tag.tags = null;
      const wrapper = setup();
      const spinner = findTestByAttr(wrapper, "spinner");
      expect(spinner.length).toBe(1);
    });
  });
});
