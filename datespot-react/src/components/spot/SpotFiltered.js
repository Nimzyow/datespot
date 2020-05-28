import React, { useRef, useEffect, Fragment } from "react";
import "./css/SpotFiltered.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { filterSpots, clearFilter } from "../../actions/spotActions";

const SpotFiltered = ({ spot: { filtered }, filterSpots, clearFilter }) => {
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterSpots(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Fragment>
      <form
        data-test="filter-container"
        style={{ width: "400px" }}
        className="text-center"
      >
        <input
          id="search-bar"
          ref={text}
          type="text"
          placeholder="Filter spots..."
          onChange={onChange}
          style={{ width: "400px" }}
        />
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  spot: state.spot,
});

SpotFiltered.propTypes = {
  spot: PropTypes.object.isRequired,
  filterSpots: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { filterSpots, clearFilter })(
  SpotFiltered
);
