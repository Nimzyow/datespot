import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr } from "../../../test/TestUtils";

import { Profile } from "./Profile";

describe("Profile.js", () => {
  let filterSpotsBasedOnLike = jest.fn();
  let getSpots = jest.fn();
  let loadUser = jest.fn();

  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      filterSpotsBasedOnLike,
      getSpots,
      loadUser,
      auth: { user: {} },
      spot: {
        spots: [{ _id: "firstId" }, { _id: "secondId" }],
        filteredByLiked: [{ _id: "firstId" }],
      },
    };
  });

  const setup = () => {
    return shallow(<Profile {...defaultProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const profileContainer = findTestByAttr(wrapper, "profile-container");

    expect(profileContainer.length).toBe(1);
  });

  describe("displays", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("header", () => {
      const headerElement = findTestByAttr(wrapper, "header-element");

      expect(headerElement.length).toBe(1);
    });
    test("user account detail", () => {
      const userAccountElement = findTestByAttr(wrapper, "useraccount-element");

      expect(userAccountElement.length).toBe(1);
    });

    test("all liked posts by the user", () => {
      const spotItem = findTestByAttr(wrapper, "spotItem-element");

      expect(spotItem.length).toBe(1);
      expect(spotItem.props().id).toBe(
        defaultProps.spot.filteredByLiked[0]._id
      );
    });
    test("spinner when user is still loading", () => {
      defaultProps.auth.user = null;
      const wrapper = setup();
      const userAccountElement = findTestByAttr(wrapper, "spinner-element");

      expect(userAccountElement.length).toBe(1);
    });
    test("spinner when filteredByLiked is still loading", () => {
      defaultProps.spot.filteredByLiked = null;
      const wrapper = setup();
      const spinner = findTestByAttr(wrapper, "spinner-liked-loading-element");

      expect(spinner.length).toBe(1);
    });
  });

  describe("Spots like-header", () => {
    test("displays spots liked header if user actaully liked a spot", () => {
      const wrapper = setup();
      const spotsLikedHeader = findTestByAttr(wrapper, "liked-header");

      expect(spotsLikedHeader.length).toBe(1);
    });
    test("displays not yet liked spots header if user didnt like a spot", () => {
      defaultProps.spot.filteredByLiked = [];
      const wrapper = setup();
      const spotsNotLikedHeader = findTestByAttr(wrapper, "not-liked-header");

      expect(spotsNotLikedHeader.length).toBe(1);
    });
  });
});
