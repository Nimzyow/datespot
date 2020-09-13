import React from "react";
import { Card, Button } from "react-bootstrap";
import "./css/SpotItem.css";
import { Link } from "react-router-dom";
import CardBody from "./CardBody";

import { connect } from "react-redux";

import { clearFilter, addSpotDetail } from "../../actions/spotActions";

export const SpotItem = ({
  spotId,
  title,
  summary,
  url,
  likes,
  clearFilter,
  addSpotDetail,
}) => {
  const spotDetailSetup = () => {
    addSpotDetail(spotId);
    clearFilter();
  };
  return (
    <Card data-test="card-container" className="shadow">
      <Card.Img data-test="card-image" variant="top" src={url} />
      <CardBody title={title} summary={summary} spotId={spotId} likes={likes} />
      <Card.Footer className="spotFooter">
        <div className="spotButton">
          <Button variant="primary">
            <Link
              data-test="card-button-message"
              onClick={spotDetailSetup}
              to="/spotdetails"
              className="link"
            >
              More information
            </Link>
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { clearFilter, addSpotDetail })(
  SpotItem
);
