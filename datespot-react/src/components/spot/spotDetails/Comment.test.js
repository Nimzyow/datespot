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

  // comment error displays if sending empty comment
  // postComment function is called when comment filled in and button clicked
  // text value changes back to "" when submitting valid comment
  //

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

    const textElement = findTestByAttr(wrapper, "text-area");

    // textElement.simulate("change", {
    //   target: { name: "textarea", value: "" },
    // });

    const buttonElement = findTestByAttr(wrapper, "button-element");
    //console.log("buttonElement", buttonElement.debug());

    buttonElement.simulate("click");

    // const textElement = findTestByAttr(wrapper, "text-area");

    // expect(textElement.props().value).toBe("")
    //wrapper.update();
    const errorElement = findTestByAttr(wrapper, "error-element");
    console.log("errorElement", errorElement.debug());

    expect(errorElement.length).toBe(1);
  });
});
