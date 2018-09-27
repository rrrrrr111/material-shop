import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import style from "app/feed/style.jsx";

class Feed extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>1</div>
                <div style={{height:200}}>2</div>
                <div style={{height:200}}>3</div>
                <div style={{height:200}}>3</div>
                <div style={{height:200}}>3</div>
                <div style={{height:200}}> 3333
                    <br/>
                </div>
            </div>
        );
    }
}

export default withStyles(style)(Feed);
