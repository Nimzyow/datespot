import React, { Fragment } from "react";
import "./App.css";
import Spot from "./components/pages/spot/Spot";
import SpotDetails from "./components/spot/spotDetails/SpotDetails";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Profile from "./components/pages/profile/Profile";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import Register from "./components/auth/Register";
import NavigationBar from "./components/layout/navbar/NavigationBar";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../src/components/Routing/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavigationBar />
          <Alerts />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/spots" component={Spot} />
            <PrivateRoute exact path="/spotdetails" component={SpotDetails} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
