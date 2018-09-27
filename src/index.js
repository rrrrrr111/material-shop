import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";

import routesMap from "app/main/routesMap.jsx";

import "lib/assets/scss/material-kit-pro-react.css?v=1.1.0";
import "app/common/styles.scss";

let hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {routesMap.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);

// registerServiceWorker(); // для работы standalone