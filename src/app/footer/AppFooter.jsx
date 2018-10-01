import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "lib/components/Footer/Footer.jsx";
import VkIcon from "../common/icon/VkIcon";
import FacebookIcon from "../common/icon/FacebookIcon";
import InstagramIcon from "../common/icon/InstragramIcon";
import MessengerIcon from "../common/icon/MessengerIcon";
import GridItem from "../../lib/components/Grid/GridItem";
import {Link} from "react-router-dom";
import GridContainer from "../../lib/components/Grid/GridContainer";

import appFooterStyle from "app/footer/appFooterStyle.jsx";

class AppFooter extends React.PureComponent {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.dividerBlock}/>
                <Footer
                    theme="dark"
                    content={
                        <div>
                            <GridContainer className={classes.footerLinks}>
                                <GridItem xs={12} sm={12} md={4}>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>О компании</h5>
                                    <p><Link to="/info/"> Миссия </Link></p>
                                    <p><Link to="/info/"> История </Link></p>
                                    <p><Link to="/info/"> Преимущества </Link></p>
                                    <p><Link to="/info/"> Реквизиты </Link></p>
                                    <p><Link to="/info/"> Контакты </Link></p>
                                    <p><Link to="/info/"> Новости </Link></p>
                                    <p><Link to="/info/"> Блог </Link></p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Вопросы и ответы</h5>
                                    <p><Link to="/info/"> Как сделать заказ </Link></p>
                                    <p><Link to="/info/"> Как оплатить товар </Link></p>
                                    <p><Link to="/info/"> Подарочные сертификаты </Link></p>
                                    <p><Link to="/info/"> Условия доставки </Link></p>
                                    <p><Link to="/info/"> Система бонусов </Link></p>
                                    <p><Link to="/info/"> Возврат товара </Link></p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Личный кабинет</h5>
                                    <p>
                                        <Link to="/info/"> Вход </Link>
                                        \
                                        <Link to="/info/"> Регистрация </Link>
                                    </p>
                                    <p><Link to="/info/"> Смена пароля </Link></p>
                                    <p><Link to="/info/"> Подписка на акции, скидки, распродажи и новости </Link></p>
                                    <p><Link to="/info/"> Политика конфиденциальности </Link></p>
                                    <p><Link to="/info/"> История заказов </Link></p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Сервис</h5>
                                    <p><Link to="/info/"> Напишите нам </Link></p>
                                    <p><Link to="/info/"> Торговля оптом </Link></p>
                                    <p><Link to="/info/"> Отзывы </Link></p>
                                </GridItem>
                            </GridContainer>

                            <div className={classes.socialIcons}>
                                <ul>
                                    <li>
                                        <VkIcon className={classes.iconSocial}/>
                                    </li>
                                    <li>
                                        <FacebookIcon className={classes.iconSocial}/>
                                    </li>
                                    <li>
                                        <InstagramIcon className={classes.iconSocial}/>
                                    </li>
                                    <li>
                                        <MessengerIcon className={classes.iconSocial}/>
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
