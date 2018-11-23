import "app/common/style/styles.css";
import MainLayout from "app/main/MainLayout";
import {routerHistory} from "app/utils/functionUtil";
import util from "app/utils/util";
import "lib/assets/scss/material-kit-pro-react.css?v=1.1.0";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router";
import {Router} from 'react-router-dom';
//import {BrowserRouter} from 'react-router-dom';
import {store} from "store";


ReactDOM.render(
    // приложение на Redux должно быть обёрнуто в Redux Provider, чтобы Redux управлял child-ами
    <Provider store={store}>
        <Router basename={util.global.routerBasename} history={routerHistory}>
            <Switch>
                <Route component={MainLayout}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);

// registerServiceWorker(); // для работы standalone