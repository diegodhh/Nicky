import { Switch, Route } from "react-router-dom";
import React from "react";
import TimeManager from "./TimeManager";
import AppBar from "./../Layout/AppBar";
import ZonesScreen from "./Zones";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/zones">
        <ZonesScreen />
      </Route>
      <Route path="/">
        <AppBar text={"home office time machine"} />

        <TimeManager />
      </Route>
    </Switch>
  );
}
