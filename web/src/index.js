import "app/common/style/styles.css?v=1.1.0";
import MainLayout from "app/main/MainLayout";
import {routerHistory} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router";
import {Router} from 'react-router-dom';
//import {BrowserRouter} from 'react-router-dom';
import {store} from "store";


util.global.getSiteConfig()
    .then((siteConfig) => {

        ReactDOM.render(
            <Provider store={store}>
                <Router basename={siteConfig.routerBasename} history={routerHistory}>
                    <Switch>
                        <Route component={MainLayout}/>
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById("root")
        );

        // registerServiceWorker(); // для работы standalone
    });