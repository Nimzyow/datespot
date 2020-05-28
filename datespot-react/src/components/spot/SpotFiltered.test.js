import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr, checkProps } from "../../test/TestUtils";
import SpotFiltered from "./SpotFiltered";

describe.only("SpotFiltered", () => {
  const filterSpotsSpy = jest.fn();
  const clearFilter = jest.fn();

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
    filterSpotsSpy,
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
});
