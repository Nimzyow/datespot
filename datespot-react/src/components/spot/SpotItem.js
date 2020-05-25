import React, { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./css/SpotItem.css";
import { Link } from "react-router-dom";
import SpotContext from "../../context/spot/SpotContext";
import CardBody from "./CardBody";

const SpotItem = (props) => {
  const spotContext = useContext(SpotContext);
  const { clearFilter, setSpotDetail } = spotContext;

  const spotDetailSetup = () => {
    setSpotDetail(props.spotId);
    clearFilter();
  }

  return (
    <Card data-test="card-container" className="shadow">
      <Card.Img variant="top" src={props.url} />
      <CardBody title={props.title} summary={props.summary} spotId={props.spotId} likes={props.likes} />
      <Card.Footer class="spotFooter">
        <div className="spotButton">
          <Button variant="primary">
            <Link
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

export default SpotItem;
