import React, { Fragment, useEffect, useContext } from "react";
import { Jumbotron, Container, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../../context/auth/AuthContext";
import SpotContext from "../../../context/spot/SpotContext"

import "../css/SpotDetails.css";

import SpotMap from "./SpotMap.js";
import Comment from "./Comment";
import SpotDetailsAbout from "./SpotDetailsAbout";
import CommentsHeader from "./CommentsHeader";

const SpotDetails = (props) => {
  const authContext = useContext(AuthContext);
  const spotContext = useContext(SpotContext);

  const { user, loadUser } = authContext;
  const { spotDetail } = spotContext;

  useEffect(() => {
    loadUser();
    getComments();
    if (!spotDetail) {
      props.history.push("/spots")
    }
  }, []);

  const getComments = () => {
    if (spotDetail) {
      if (spotDetail.comments.length === 0) {
        return (
          <div>
            <h5>No comments to display for this spot...yet</h5>
          </div>
        );
      } else {
        return spotDetail.comments.map((obj) => (
          <div
            key={obj._id}
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

    <div>{spotDetail ? (<div><Jumbotron
      fluid
      className="shadow"
      style={{
        backgroundImage: `url(${spotDetail.url})`,
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "375px",
      }}
    >
      <Container>
        <h1>
          <span>{spotDetail.title}</span>
        </h1>
        <h3>
          <span>{spotDetail.summary}</span>
        </h3>
        <h6>
          <span>{spotDetail.location}</span>
        </h6>
      </Container>
    </Jumbotron>
      <div class="container">
        <Container className="cont">
          <Row>
            <SpotDetailsAbout
              avgCost={spotDetail.avgCost}
              bestTimes={spotDetail.bestTimes}
              dress={spotDetail.dress}
              description={spotDetail.description}
              advice={spotDetail.advice}
            />
            <Col>
              <div className="map shadow">
                <SpotMap
                  longitude={spotDetail.longitude}
                  latitude={spotDetail.latitude}
                ></SpotMap>
              </div>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <div className="address">
                <FontAwesomeIcon icon={faLocationArrow} /> :{" "}
                {spotDetail.address}{" "}
              </div>
              <CommentsHeader />
              <div>{getComments()}</div>
              {user && <Comment spotId={spotDetail._id} />}
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
