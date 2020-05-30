import React from "react";
import { shallow } from "enzyme";

import { findTestByAttr } from "../../../test/TestUtils";

import SpotAdvice from "./SpotAdvice";

describe("SpotAdvice.js", () => {
  const defaultProps = {
    advice: "nice advice",
  };

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<SpotAdvice {...setupProps} />);
  };
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("renders button container without error", () => {
    const buttonContainer = findTestByAttr(wrapper, "button-container");

    expect(buttonContainer.length).toBe(1);
    expect(buttonContainer.text()).toBe("Let me give you some advice...");
  });
  test("renders advice without error", () => {
    const spotAdviceContainer = findTestByAttr(wrapper, "spot-a-container");

    expect(spotAdviceContainer.length).toBe(1);
    expect(spotAdviceContainer.props().advice).toBe(defaultProps.advice);
  });
  test("toast body contains advice", () => {
    const spotAdviceToastElement = findTestByAttr(wrapper, "spot-a-element");

    expect(spotAdviceToastElement.length).toBe(1);
    expect(spotAdviceToastElement.text()).toBe(defaultProps.advice);
  });
  test("header for advice displays text", () => {
    const adviceHeader = findTestByAttr(wrapper, "advice-header");

    expect(adviceHeader.length).toBe(1);
    expect(adviceHeader.text().length).not.toBe(0);
  });
});
