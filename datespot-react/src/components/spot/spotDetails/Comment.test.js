import React from "react";
import { shallow } from "enzyme";

import { findTestByAttr } from "../../../test/TestUtils";

import { Comment } from "./Comment";

describe("Comment.js", () => {
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
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    test("label", () => {
      const labelElement = findTestByAttr(wrapper, "label-element");

      expect(labelElement.text().length).not.toBe(0);
      expect(labelElement.text()).toBe("Comment");
    });
    test("text area ", () => {
      const textElement = findTestByAttr(wrapper, "text-area");

      expect(textElement.length).toBe(1);
    });
    test("label", () => {
      const buttonElement = findTestByAttr(wrapper, "button-element");

      expect(buttonElement.length).toBe(1);
      expect(buttonElement.text().length).not.toBe(0);
    });
  });
  test("error when submitting empty comment", () => {
    const wrapper = setup();
    const buttonElement = findTestByAttr(wrapper, "button-element");
    buttonElement.simulate("click");
    const errorElement = findTestByAttr(wrapper, "error-element");

    expect(errorElement.length).toBe(1);
  });
  test("correct text change when typing", () => {
    const wrapper = setup();

    let textElement = findTestByAttr(wrapper, "text-area");
    textElement.simulate("change", {
      target: { name: "textarea", value: "CHANGED" },
    });
    textElement = findTestByAttr(wrapper, "text-area");

    expect(textElement.props().value).toBe("CHANGED");
  });
  test("successfully posts a comment", () => {
    const wrapper = setup();

    const textElement = findTestByAttr(wrapper, "text-area");
    textElement.simulate("change", {
      target: { name: "textarea", value: "CHANGED" },
    });
    const buttonElement = findTestByAttr(wrapper, "button-element");
    buttonElement.simulate("click");

    expect(postComment).toHaveBeenCalledTimes(1);
  });
  test("textarea value return to '' after succesfull post", () => {
    const wrapper = setup();

    let textElement = findTestByAttr(wrapper, "text-area");
    textElement.simulate("change", {
      target: { name: "textarea", value: "CHANGED" },
    });
    const buttonElement = findTestByAttr(wrapper, "button-element");
    buttonElement.simulate("click");
    textElement = findTestByAttr(wrapper, "text-area");

    expect(textElement.props().value).toBe("");
  });
});
