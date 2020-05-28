import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr, checkProps } from "../../test/TestUtils";

import { SpotItem } from "./SpotItem";

describe("SpotItem.js", () => {
  const defaultProps = {
    title: "great location",
    description: "turned on by the sciences",
    image: "some link",
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

  // describe("display", () => {
  //   let wrapper;
  //   beforeEach(() => {
  //     wrapper = setup();
  //   });
  //   test("correct title", () => {
  //     const titleContainer = findTestByAttr(wrapper, "text-container");
  //     expect(titleContainer.text()).toContain("great location");
  //   });
  //   test("description displays correctly", () => {
  //     const descriptionContainer = findTestByAttr(
  //       wrapper,
  //       "description-container"
  //     );
  //     expect(descriptionContainer.text()).toContain(
  //       "turned on by the sciences"
  //     );
  //   });
  // });
});
