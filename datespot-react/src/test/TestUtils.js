import checkPropTypes from "check-prop-types";

import rootReducer from "../reducers/index";
import { createStore } from "redux";

/**
 * Create a testing store with imported reducers, middleware and initial state.
 *
 * @param {object} initialState - initial state for store
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState) => {
  createStore(rootReducer, initialState);
};

/**
 *
 * @param {ShallowWrapper} wrapper - Enzyme Shallow Wrapper
 * @param {*} value - Value of data test attribute to search
 * @returns {ShallowWrapper}
 */
export const findTestByAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
