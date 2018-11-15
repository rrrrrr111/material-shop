import "app/common/style/styles.css";
import MainLayout from "app/main/MainLayout";
import util from "app/utils/util";
import "lib/assets/scss/material-kit-pro-react.css?v=1.1.0";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import {configureStore} from "store";


ReactDOM.render(
    // приложение на Redux должно быть обёрнуто в Redux Provider, чтобы Redux управлял child-ами
    <Provider store={configureStore()}>
        <BrowserRouter basename={util.global.routerBasename}>
            <Switch>
                <Route component={MainLayout}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

// registerServiceWorker(); // для работы standalone