import React from "react";
import { shallow, mount } from "enzyme";
import { findTestByAttr } from "../../test/TestUtils";

import { CardBody } from "./CardBody";

describe("CardBody.js", () => {
  let addToLikeCount = jest.fn();
  let removeFromLikeCount = jest.fn();

  const defaultProps = {
    title: "a great place",
    summary: "this is a really mental place",
    spotId: "spotId",
    addToLikeCount,
    removeFromLikeCount,
    likes: [{ userId: "correctId" }],
    auth: {
      user: { _id: "correctId" },
    },
  };

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<CardBody {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const cardContainer = findTestByAttr(wrapper, "card-container");

    expect(cardContainer.length).toBe(1);
  });

  describe("displays on Card body", () => {
    test("title", () => {
      const wrapper = setup();
      const cardTitle = findTestByAttr(wrapper, "card-title");

      expect(cardTitle.text()).toBe(defaultProps.title);
    });
    test("title", () => {
      const wrapper = setup();
      const cardSummary = findTestByAttr(wrapper, "card-summary");

      expect(cardSummary.text()).toBe(defaultProps.summary);
    });
  });

  describe("like is", () => {
    test("red when likes userId is same as current user id", () => {
      // due to a bug with enzymes shallow when a component is using useEffect, we have to switch to mount here
      const wrapper = mount(<CardBody {...defaultProps} />);
      const likeElement = findTestByAttr(wrapper, "like");

      expect(likeElement.props().color).toBe("red");
    });
    test("black when there no likes on a spot", () => {
      defaultProps.likes = [];
      // due to a bug with enzymes shallow when a component is using useEffect, we have to switch to mount here
      const wrapper = mount(<CardBody {...defaultProps} />);
      const likeElement = findTestByAttr(wrapper, "like");

      expect(likeElement.props().color).toBe("black");
    });
    test("black when spot has likes but user hasnt liked spot", () => {
      defaultProps.likes = [{ userId: "wrongId" }];
      // due to a bug with enzymes shallow when a component is using useEffect, we have to switch to mount here
      const wrapper = mount(<CardBody {...defaultProps} />);
      const likeElement = findTestByAttr(wrapper, "like");

      expect(likeElement.props().color).toBe("black");
    });
  });
});
