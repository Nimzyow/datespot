import React from "react";
import { shallow } from "enzyme";

import { findTestByAttr } from "../../../test/TestUtils";

import { Comment } from "./Comment";

describe("Comment.js", () => {
  // renders without error
  // label displays
  // text area displays
  //submit button displays
  // comment error displays if sending empty comment
  // postComment function is called when comment filled in and button clicked
  // text value changes back to "" when submitting valid comment
  //

  let postComment = jest.fn();

  const defaultProps = {
    spotId: "niceSpotId",
    postComment,
    auth: {
      user: { _id: "userId" },
    },
  };

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Comment {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const formContainer = findTestByAttr(wrapper, "form-container");

    expect(formContainer.length).toBe(1);
  });

  describe("displays", () => {
    test("label", () => {
      const wrapper = setup();
      const labelElement = findTestByAttr(wrapper, "label-element");

      expect(labelElement.text().length).not.toBe(0);
      expect(labelElement.text()).toBe("Comment");
    });
  });
});
