import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Header from "lib/components/Header/Header.jsx";
import HeaderLinks from "lib/components/Header/HeaderLinks.jsx";
import Parallax from "lib/components/Parallax/Parallax.jsx";
import Footer from "lib/components/Footer/Footer.jsx";
import GridContainer from "lib/components/Grid/GridContainer.jsx";
import GridItem from "lib/components/Grid/GridItem.jsx";
import Button from "lib/components/CustomButtons/Button.jsx";

import style from "app/main/style.jsx";

class MainLayout extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          brand="LC Cosmetics"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "info"
          }}
        />
        <Parallax
          image={require("app/main/temp/bg.jpg")}
          className={classes.parallax}
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
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>3</div>
          <div>3</div>
          <div>3</div>
        </div>

        <Footer
          theme="white"
          content={
            <div>
              <div className={classes.left}>
                <a href="#" className={classes.footerBrand}>
                  Material Kit PRO React
                </a>
              </div>
              <div className={classes.pullCenter}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.rightLinks}>
                <ul>
                  <li>
                    <Button
                      href="https://twitter.com/CreativeTim"
                      color="twitter"
                      justIcon
                      simple
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://dribbble.com/creativetim"
                      color="dribbble"
                      justIcon
                      simple
                    >
                      <i className="fab fa-dribbble" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://instagram.com/CreativeTimOfficial"
                      color="instagram"
                      justIcon
                      simple
                    >
                      <i className="fab fa-instagram" />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(style)(MainLayout);
