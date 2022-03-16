import React from "react";
import {Routes as Switch, Route} from "react-router-dom";

import Inicio from "./Inicio";

export default function Routes() {
  return(
    <>
      <Switch>
        <Route path="/" element={<Inicio/>}/>
      </Switch>
    </>
  );
}