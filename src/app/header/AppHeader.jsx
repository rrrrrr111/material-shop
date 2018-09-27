import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "app/header/Header.jsx";
import HeaderLinks from "app/header/HeaderLinks.jsx";
import Parallax from "lib/components/Parallax/Parallax.jsx";
import GridContainer from "lib/components/Grid/GridContainer.jsx";
import GridItem from "lib/components/Grid/GridItem.jsx";

import style from "app/header/style.jsx";

class AppHeader extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header
                    brand="LC Cosmetics"
                    links={<HeaderLinks dropdownHoverColor="info"/>}
                    fixed
                    color="transparent"
                    changeColorOnScroll={{
                        height: 100,
                        color: "rose"
                    }}
                />
                <Parallax
                    image={require("app/header/hero_bg.jpg")}
                    filter="rose"
                    className={classes.headerImage}
                >
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem>
                                <div className={classes.brand}>
                                    <h1>
                                        Material Kit React
                                        <span className={classes.proBadge}>PRO</span>
                                    </h1>
                                    <h3 className={classes.title}>
                                        A Badass Material-UI Kit based on Material Design.
                                    </h3>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
            </div>
        );
    }
}

export default withStyles(style)(AppHeader);
