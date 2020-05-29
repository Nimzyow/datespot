import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr, checkProps } from "../../test/TestUtils";

import { TagItem } from "./TagItem";

describe("TagItem.js", () => {
  let filterSpotsByTags = jest.fn();
  let clearFilterSpotsByTags = jest.fn();
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      tag: "Adventure",
      tagId: "AdventureID",
      filterSpotsByTags,
      clearFilterSpotsByTags,
      spot: {
        filterId: "AdventureID",
      },
    };
  });

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<TagItem {...setupProps} />);
  };

  test("renders container without error", () => {
    const wrapper = setup();
    const container = wrapper.find('[data-test="badge-container"]');
    expect(container.length).toBe(1);
  });
  describe("badge", () => {
    test("displays Fantasy tag", () => {
      defaultProps.tag = "Fantasy";
      const wrapper = setup();
      const container = wrapper.find('[data-test="badge-container"]');
      expect(container.text()).toBe("Fantasy");
    });

    test("displays red color when selected", () => {
      const wrapper = setup();
      const container = wrapper.find('[data-test="badge-container"]');
      expect(container.hasClass("badgeRed")).toBe(true);
    });

    test("displays black color when not selected", () => {
      defaultProps.tagId = "FantasyId";
      const wrapper = setup();
      const container = wrapper.find('[data-test="badge-container"]');
      expect(container.hasClass("badgeBlack")).toBe(true);
    });

    test("calls filterSpotsByTags when tagId does not equal filterId", () => {
      defaultProps.tagId = "FantasyId";
      const wrapper = setup();
      const container = wrapper.find('[data-test="badge-container"]');

      container.simulate("click");

      expect(filterSpotsByTags).toHaveBeenCalledTimes(1);
      expect(clearFilterSpotsByTags).toHaveBeenCalledTimes(0);
    });

    test("calls filterSpotsByTags when tagId equals filterId", () => {
      const wrapper = setup();
      const container = wrapper.find('[data-test="badge-container"]');

      container.simulate("click");

      expect(clearFilterSpotsByTags).toHaveBeenCalledTimes(1);
      expect(filterSpotsByTags).toHaveBeenCalledTimes(0);
    });
  });
});
