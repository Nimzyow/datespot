import React, { Fragment, useEffect, useContext } from "react";
import { Jumbotron, Container, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../../context/auth/AuthContext";

import "../css/SpotDetails.css";

import SpotMap from "./SpotMap.js";
import Comment from "./Comment";
import SpotDetailsAbout from "./SpotDetailsAbout";
import CommentsHeader from "./CommentsHeader";

const SpotDetails = (props) => {
  console.log(1, props.location.aboutProps);
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;
  const properties = props.location.aboutProps;
  useEffect(() => {
    loadUser();
    getComments();
  }, []);

  const getComments = () => {
    if (properties) {
      if (properties.comments.length === 0) {
        return (
          <div>
            <h5>No comments to display for this spot...yet</h5>
          </div>
        );
      } else {
        return properties.comments.map((obj) => (
          <div
            style={{
              border: "1px solid black",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            {obj.comment}
          </div>
        ));
      }
    } else {
      return (
        <div>
          <h5>No comments to display for this spot...yet</h5>
        </div>
      );
    }
  };

  return (

    <div>{properties ? (<div><Jumbotron
      fluid
      className="shadow"
      style={{
        backgroundImage: `url(${properties.url})`,
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "375px",
      }}
    >
      <Container>
        <h1>
          <span>{properties.title}</span>
        </h1>
        <h3>
          <span>{properties.summary}</span>
        </h3>
        <h6>
          <span>{properties.location}</span>
        </h6>
      </Container>
    </Jumbotron>
      <div class="container">
        <Container className="cont">
          <Row>
            <SpotDetailsAbout
              avg_cost={properties.avgCost}
              best_times={properties.bestTimes}
              dress={properties.dress}
              description={properties.description}
              advice={properties.advice}
            />
            <Col>
              <div className="map shadow">
                <SpotMap
                  longitude={properties.longitude}
                  latitude={properties.latitude}
                ></SpotMap>
              </div>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <div className="address">
                <FontAwesomeIcon icon={faLocationArrow} /> :{" "}
                {properties.address}{" "}
              </div>
              <CommentsHeader />
              <div>{getComments()}</div>
              {user && <Comment spot_id={properties.id} />}
            </Col>
          </Row>
        </Container>
      </div>
    </div>) :
      (
        <div className="text-center" style={{ marginTop: "300px" }}>
          <Spinner animation="border" variant="danger" />
        </div>
      )}
    </div>
  );
};

export default SpotDetails;
