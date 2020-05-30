import React from "react";
import { shallow, mount } from "enzyme";
import { findTestByAttr } from "../../../test/TestUtils";

import { Spot } from "./Spot";

describe("Spot.js", () => {
  let getSpots = jest.fn();
  let clearSpotDetail = jest.fn();
  let loadUser = jest.fn();

  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      spot: {
        spots: [{ _id: "correctId" }, { _id: "secondId" }],
        filtered: null,
        filteredByTag: null,
      },
      getSpots,
      clearSpotDetail,
      loadUser,
    };
  });

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Spot {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const spotContainer = findTestByAttr(wrapper, "spot-container");

    expect(spotContainer.length).toBe(1);
  });

  describe("displays in Spot page", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("a jumbotron", () => {
      const jumbotronElement = findTestByAttr(wrapper, "jumbotron-element");

      expect(jumbotronElement.length).toBe(1);
    });

    test("search component", () => {
      const searchComponent = findTestByAttr(wrapper, "search-component");

      expect(searchComponent.length).toBe(1);
    });

    test("spots available", () => {
      const spotsComponent = findTestByAttr(wrapper, "spots-component");

      expect(spotsComponent.length).toBe(1);
    });
  });

  describe("spot items", () => {
    test("are all displayed", () => {
      const wrapper = setup();
      const spotItemsElement = findTestByAttr(wrapper, "spot-item-component");

      expect(spotItemsElement.length).toBe(2);
    });
    test("are filtered by typing", () => {
      defaultProps.spot.filtered = [{ _id: "firstId" }];
      const wrapper = setup();
      const spotItemsElement = findTestByAttr(wrapper, "spot-item-component");

      expect(spotItemsElement.length).toBe(1);
    });
    test("are filtered by tag", () => {
      defaultProps.spot.filtered = [{ _id: "secondId" }];
      const wrapper = setup();
      const spotItemsElement = findTestByAttr(wrapper, "spot-item-component");

      expect(spotItemsElement.length).toBe(1);
      expect(spotItemsElement.props().spotId).toBe(
        defaultProps.spot.filtered[0]._id
      );
    });
    test("replaced by spinner if spots is null", () => {
      defaultProps.spot.spots = null;
      const wrapper = setup();
      const spinner = findTestByAttr(wrapper, "spinner-element");

      expect(spinner.length).toBe(1);
    });
  });
});
