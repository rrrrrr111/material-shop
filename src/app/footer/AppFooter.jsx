import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Footer from "lib/components/Footer/Footer.jsx";
import Button from "lib/components/CustomButtons/Button.jsx";

import appFooterStyle from "app/footer/appFooterStyle.jsx";

class AppFooter extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.dividerBlock}/>
                <Footer
                    theme="dark"
                    content={
                        <div>
                            <div className={classes.left}>
                                <a href="/" className={classes.footerBrand}>
                                    Material Kit PRO React
                                </a>
                            </div>
                            <div className={classes.pullCenter}>
                                <List className={classes.list}>
                                    <ListItem className={classes.inlineBlock}>
                                        <a href="https://www.creative-tim.com/"
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
                                            <i className="fab fa-twitter"/>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            href="https://dribbble.com/creativetim"
                                            color="dribbble"
                                            justIcon
                                            simple
                                        >
                                            <i className="fab fa-dribbble"/>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            href="https://instagram.com/CreativeTimOfficial"
                                            color="instagram"
                                            justIcon
                                            simple
                                        >
                                            <i className="fab fa-instagram"/>
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

export default withStyles(appFooterStyle)(AppFooter);
