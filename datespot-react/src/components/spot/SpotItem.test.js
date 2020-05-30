import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr, checkProps } from "../../test/TestUtils";

import { SpotItem } from "./SpotItem";

describe("SpotItem.js", () => {
  let addSpotDetail = jest.fn();
  let clearFilter = jest.fn();
  const defaultProps = {
    title: "great location",
    description: "turned on by the sciences",
    image: "www.google.com",
    addSpotDetail,
    clearFilter,
  };

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<SpotItem {...setupProps} />);
  };

  describe("renders without error", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("Card", () => {
      const card = findTestByAttr(wrapper, "card-container");
      expect(card.length).toBe(1);
    });
    test("Card image", () => {
      const cardImage = findTestByAttr(wrapper, "card-image");
      expect(cardImage.length).toBe(1);
    });
    test("button displays text", () => {
      const cardButtonText = findTestByAttr(wrapper, "card-button-message");
      expect(cardButtonText.text().length).not.toBe(0);
    });
  });

  describe("clicking link calls functions for adding spot detail", () => {
    test("image", () => {
      const wrapper = setup();
      const cardButtonText = findTestByAttr(wrapper, "card-button-message");
      cardButtonText.simulate("click");
      expect(addSpotDetail).toHaveBeenCalledTimes(1);
      expect(clearFilter).toHaveBeenCalledTimes(1);
    });
  });
});
