import React, { Fragment, useEffect } from "react";

import { Spinner } from "react-bootstrap";

import Header from "../../profile/Header";

import SpotItemHeartless from "../../spot/SpotItemHeartless";
import UserAccountDetail from "./UserAccountDetail";

import "./Profile.css";

import { connect } from "react-redux";

import { filterSpotsBasedOnLike, getSpots } from "../../../actions/spotActions";
import { loadUser } from "../../../actions/authActions";

export const Profile = ({
  filterSpotsBasedOnLike,
  getSpots,
  loadUser,
  spot: { filteredByLiked, spots },
  auth: { user },
}) => {
  useEffect(() => {
    loadUser();
    if (!spots) {
      getSpots();
    }
  }, []);

  useEffect(() => {
    filterSpotsBasedOnLike(user);
  }, [spots]);

  const SpotsLiked = () => {
    return filteredByLiked == null || filteredByLiked.length === 0 ? (
      <h5 data-test="not-liked-header" style={{ textAlign: "center" }}>
        Spots you liked will appear here :)
      </h5>
    ) : (
      <h5 data-test="liked-header" style={{ textAlign: "center" }}>
        You liked the following Spots:
      </h5>
    );
  };

  return (
    <div data-test="profile-container">
      <Header data-test="header-element" />
      <div className="container cont">
        <Fragment>
          <div
            style={{ marginTop: "30px", display: "flex", flexDirection: "row" }}
          >
            {user ? (
              <UserAccountDetail data-test="useraccount-element" user={user} />
            ) : (
              <div
                data-test="spinner-element"
                className="text-center"
                style={{ marginTop: "300px" }}
              >
                <Spinner animation="border" variant="danger" />
              </div>
            )}

            <div xs={6} md={6} id="likedContainer">
              {SpotsLiked()}
              {/**this is where we display the cards which the user liked */}
              {filteredByLiked ? (
                filteredByLiked.map((spot) => (
                  <SpotItemHeartless
                    data-test="spotItem-element"
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
              ) : (
                <div
                  data-test="spinner-liked-loading-element"
                  className="text-center"
                  style={{ marginTop: "300px" }}
                >
                  <Spinner animation="border" variant="danger" />
                </div>
              )}
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  spot: state.spot,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  filterSpotsBasedOnLike,
  getSpots,
  loadUser,
})(Profile);
