import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { CardColumns, Jumbotron, Container, Spinner } from "react-bootstrap";
import table from "../../../assets/images/table.jpg";
import "./Spot.css";

import SpotItem from "../../spot/SpotItem";
import Search from "../../spot/Search";

import { connect } from "react-redux";

import { getSpots, clearSpotDetail } from "../../../actions/spotActions";
import { loadUser } from "../../../actions/authActions";

const Spot = ({
  spot: { spots, filtered, filteredByTag },
  getSpots,
  clearSpotDetail,
  loadUser,
}) => {
  useEffect(() => {
    loadUser();
    getSpots();
    clearSpotDetail();
  }, []);

  const spotItemToDisplay = () => {
    if (filteredByTag !== null) {
      return spotItem(filteredByTag);
    } else if (filtered !== null) {
      if (filtered.length !== 0) {
        return spotItem(filtered);
      } else {
        return <div>No Spots found. please try another search</div>;
      }
    } else {
      return spotItem(spots);
    }
  };

  const spotItem = (toFilter) => {
    //console.log("What is the spot id?", toFilter[0]._id)
    return toFilter.map((spot) => (
      <SpotItem
        key={spot._id}
        title={spot.title}
        location={spot.location}
        description={spot.description}
        aveCost={spot.ave_cost}
        url={spot.url}
        latitude={spot.latitude}
        longitude={spot.longitude}
        avgCost={spot.avgCost}
        spotId={spot._id}
        summary={spot.summary}
        address={spot.address}
        dress={spot.dress}
        bestTimes={spot.bestTimes}
        advice={spot.advice}
        likes={spot.likes}
        comments={spot.comments}
      />
    ));
  };

  return (
    <div>
      <Jumbotron
        fluid
        className="shadow jumboContainer"
        style={{
          backgroundImage: `url(${table})`,
        }}
      >
        <Search />
      </Jumbotron>
      <Container className="cont">
        <div>
          {spots !== null ? (
            <CardColumns style={{ marginTop: "20px" }}>
              {spotItemToDisplay()}
            </CardColumns>
          ) : (
            <div className="text-center" style={{ marginTop: "300px" }}>
              <Spinner animation="border" variant="danger" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

Spot.propTypes = {
  spot: PropTypes.object.isRequired,
  getSpots: PropTypes.func.isRequired,
  clearSpotDetail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  spot: state.spot,
});

export default connect(mapStateToProps, {
  getSpots,
  clearSpotDetail,
  loadUser,
})(Spot);
