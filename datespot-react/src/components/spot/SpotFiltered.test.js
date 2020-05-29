import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr, checkProps, storeFactory } from "../../test/TestUtils";
import { SpotFiltered } from "./SpotFiltered";

describe.only("SpotFiltered", () => {
  let filterSpots = jest.fn();
  let clearFilter = jest.fn();

  beforeEach(() => {});
  const defaultProps = {
    spot: {
      filtered: [
        {
          id: 1,
          title: "this is a great spot",
          date_created: "2020-01-06",
          date_updated: "2020-01-08",
        },
        {
          id: 2,
          title: "this is a post that goes on and on and on",
          date_created: "2020-02-06",
          date_updated: "2020-03-08",
        },
      ],
    },
    filterSpots,
    clearFilter,
  };

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<SpotFiltered {...setupProps} />);
  };

  describe("renders correctly", () => {
    test("SpotFiltered", () => {
      const wrapper = setup();

      const filterContainer = findTestByAttr(wrapper, "filter-container");
      expect(filterContainer.length).toBe(1);
    });
  });
  describe("onChange", () => {
    test("calls filterSpots when text is not empty", () => {
      const wrapper = setup();
      const inputElement = findTestByAttr(wrapper, "input-element");
      inputElement.simulate("change", {
        target: { name: "search", value: "london" },
      });
      expect(filterSpots).toHaveBeenCalledTimes(1);
      expect(clearFilter).toHaveBeenCalledTimes(0);
    });
  });
});
