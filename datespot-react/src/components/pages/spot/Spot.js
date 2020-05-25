import React, { useContext, useEffect } from "react";
import SpotContext from "../../../context/spot/SpotContext";
import AuthContext from "../../../context/auth/AuthContext"
import { CardColumns, Jumbotron, Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import SpotItem from "../../spot/SpotItem";
import Search from "../../spot/Search";
import table from "../../../assets/images/table.jpg";
import "./Spot.css";

const Spot = () => {
  const spotContext = useContext(SpotContext);
  const authContext = useContext(AuthContext);
  const { spots, filtered, getSpots, filteredByTag, clearSpotDetail } = spotContext;
  useEffect(() => {
    authContext.loadUser();
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
        key={spot.id}
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

export default Spot;
