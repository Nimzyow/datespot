import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr } from "../../test/TestUtils";

import { CardBody } from "./CardBody";

describe("CardBody.js", () => {
  // renders card container
  // displays passed in title
  //displays passed in summary
  // like color is black when likes.length === 0
  // like color is red when like.userId === user._id length is 1
  // so basically make sure likes is an array with an object containing userId same as
  // user._id

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
});
