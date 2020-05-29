import React from "react";
import { shallow } from "enzyme";
import { findTestByAttr } from "../../test/TestUtils";

import Like from "./Like";

describe("Like.js", () => {
  let likeCount = jest.fn();
  let setLikeState = jest.fn();
  const defaultProps = {
    likeCount,
    setLikeState,
    color: "red",
  };

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Like {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const likeContainer = findTestByAttr(wrapper, "like-container");
    expect(likeContainer.length).toBe(1);
  });

  test("clicking icon calls setLikeState function", () => {
    const wrapper = setup();
    const iconElement = findTestByAttr(wrapper, "icon-container");
    iconElement.simulate("click");

    expect(setLikeState).toHaveBeenCalledTimes(1);
  });
  test("likeCount function called on mount", () => {
    expect(likeCount).toHaveBeenCalled();
  });
});
