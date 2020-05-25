import React, { Fragment, useContext, useEffect } from "react";

import { Spinner } from "react-bootstrap";

import Header from "../../profile/Header";

import AuthContext from "../../../context/auth/AuthContext";
import SpotContext from "../../../context/spot/SpotContext";

import SpotItemHeartless from "../../spot/SpotItemHeartless";
import UserAccountDetail from "./UserAccountDetail";

import "./Profile.css";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { filterSpotsBasedOnLike, filteredByLiked, getSpots, spots } = useContext(SpotContext);
  const { user } = authContext

  useEffect(() => {
    authContext.loadUser()
    if (!spots) {
      console.log("here");
      getSpots();
    }
  }, []);

  useEffect(() => {
    filterSpotsBasedOnLike(user);
  }, [spots])

  const SpotsLiked = () => {
    return filteredByLiked == null ? (
      <h5 style={{ textAlign: "center" }}>
        Spots you liked will appear here :)
      </h5>
    ) : (
        <h5 style={{ textAlign: "center" }}>You liked the following Spots:</h5>
      );
  };

  return (
    <div>
      <Header />
      <div className="container cont">
        <Fragment>
          <div
            style={{ marginTop: "30px", display: "flex", flexDirection: "row" }}
          >{user ? (<UserAccountDetail user={user} />) : (
            <div className="text-center" style={{ marginTop: "300px" }}>
              <Spinner animation="border" variant="danger" />
            </div>)}

            <div xs={6} md={6} id="likedContainer">
              {SpotsLiked()}
              {/**this is where we display the cards which the user liked */}
              {filteredByLiked ? (
                filteredByLiked.map((spot) => (
                  <SpotItemHeartless
                    key={spot._id}
                    title={spot.title}
                    location={spot.location}
                    description={spot.description}
                    ave_cost={spot.aveCost}
                    url={spot.url}
                    latitude={spot.latitude}
                    longitude={spot.longitude}
                    id={spot._id}
                    summary={spot.summary}
                    address={spot.address}
                    dress={spot.dress}
                    best_times={spot.bestTimes}
                    advice={spot.advice}
                  />
                ))
              ) : <div className="text-center" style={{ marginTop: "300px" }}>
                  <Spinner animation="border" variant="danger" />
                </div>
              }
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default Profile;
