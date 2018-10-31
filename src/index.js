import "app/common/style/styles.css";
import MainLayout from "app/main/MainLayout";
import {createBrowserHistory} from "history";
import "lib/assets/scss/material-kit-pro-react.css?v=1.1.0";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router";
import {configureStore} from "store";


ReactDOM.render(
    // приложение на Redux должно быть обёрнуто в Redux Provider, чтобы Redux управлял child-ами
    <Provider store={configureStore()}>
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path="/" component={MainLayout}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);

// registerServiceWorker(); // для работы standalone