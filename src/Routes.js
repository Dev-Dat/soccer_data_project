import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

// improt 페이지 목록
import SoccerStats from "./SoccerStats";
//import PlayerStats from "./PlayerStats";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SoccerStats} />
        {/* <Route exact path="/SoccerStats" component={SoccerStats} /> */}
        {/* <Route exact path="/PlayerStats" component={PlayerStats} /> */}
        </Switch>
    </Router>
  );
}

export default Routes;
