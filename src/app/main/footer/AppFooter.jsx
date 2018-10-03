import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "lib/components/Footer/Footer.jsx";
import VkIcon from "app/common/icon/VkIcon";
import FacebookIcon from "app/common/icon/FacebookIcon";
import classNames from "classnames";
import InstagramIcon from "app/common/icon/InstragramIcon";
import MessengerIcon from "app/common/icon/WhatsappIcon";
import GridItem from "lib/components/Grid/GridItem";
import GridContainer from "lib/components/Grid/GridContainer";

import appFooterStyle from "app/main/footer/appFooterStyle.jsx";
import NavLink from "react-router-dom/es/NavLink";

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
                                    <p><NavLink to="/info/mission"> Миссия </NavLink></p>
                                    <p><NavLink to="/info/history"> История </NavLink></p>
                                    <p><NavLink to="/info/advantage"> Преимущества </NavLink></p>
                                    <p><NavLink to="/info/requisites"> Реквизиты </NavLink></p>
                                    <p><NavLink to="/info/contacts"> Контакты </NavLink></p>
                                    <p><NavLink to="/info/news"> Новости </NavLink></p>
                                    <p><NavLink to="/info/"> Отзывы </NavLink></p>
                                    <p><NavLink to="/info/blog"> Блог </NavLink></p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Вопросы и ответы</h5>
                                    <p><NavLink to="/info/how-to#order"> Как сделать заказ </NavLink></p>
                                    <p><NavLink to="/info/how-to#pay"> Как оплатить товар </NavLink></p>
                                    <p><NavLink to="/info/gift-certificates"> Подарочные сертификаты </NavLink></p>
                                    <p><NavLink to="/info/delivery"> Условия доставки </NavLink></p>
                                    <p><NavLink to="/info/bonuses"> Система бонусов </NavLink></p>
                                    <p><NavLink to="/info/returns"> Возврат товара </NavLink></p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Личный кабинет</h5>
                                    <p>
                                        <NavLink to={{
                                            pathname: "/auth/signin",
                                            state: {modal: true} // флаг чтобы вернуться на туже страницу
                                        }}> Вход </NavLink>
                                        \
                                        <NavLink to={{
                                            pathname: "/auth/signup",
                                            state: {modal: true}
                                        }}> Регистрация </NavLink>
                                    </p>
                                    <p><NavLink to="/user/profile"> Профиль пользователя </NavLink></p>
                                    <p><NavLink to="/user/cart"> Корзина </NavLink></p>
                                    <p><NavLink to="/user/orders"> История заказов </NavLink></p>
                                    <p><NavLink to="/user/settings"> Настройки </NavLink></p>
                                    <p><NavLink to="/user/password"> Смена пароля </NavLink></p>
                                    <p>
                                        <NavLink to={{
                                            pathname: "/auth/signout",
                                            state: {modal: true}
                                        }}> Выход </NavLink>
                                    </p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Сервис</h5>
                                    <p><NavLink to="/info/"> Напишите нам </NavLink></p>
                                    <p><NavLink to="/info/"> Торговля оптом </NavLink></p>
                                    <p><NavLink to="/subscribe/sales-and-news"> Подписка на акции, скидки, распродажи и
                                        новости </NavLink></p>
                                    <p><NavLink to="/info/privacy-policy"> Политика конфиденциальности </NavLink></p>
                                </GridItem>
                            </GridContainer>
                            <hr/>
                            <GridContainer>
                                <GridItem xs={12} sm={9} md={9}>
                                    <div className={classNames(classes.copyRightInfo)}>
                                        &copy; {1900 + new Date().getYear()}{" "}
                                        <NavLink to="/" className={classes.aClasses}> LC Cosmetics </NavLink>{" "}
                                        <br/>
                                        Вся информация на сайте – собственность интернет-магазина LC Cosmetics.
                                        Публикация информации с сайта LC Cosmetics без разрешения правообладателя
                                        запрещена.
                                        <br/>
                                        Все права защищены.
                                        Информация на сайте LC Cosmetics не является публичной офертой.
                                        <br/>
                                        Указанные цены действуют только при оформлении заказа на сайте интернет-магазина
                                        LC Cosmetics.
                                        Цены в пунктах выдачи товара и магазинах компании LC Cosmetics могут отличаться
                                        от указанных в интернет-магазине.
                                        <br/>
                                        Вы принимаете условия
                                        <NavLink to="/info/privacy-policy" className={classes.aClasses}> политики
                                            конфиденциальности </NavLink>{" "}
                                        и
                                        <NavLink to="/info/user-agreement"
                                                 className={classes.aClasses}> пользовательского
                                            соглашения </NavLink>{" "}
                                        каждый раз, когда оставляете свои данные в любой
                                        форме обратной связи на сайте LC Cosmetics.
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={3} md={3}>
                                    <div className={classNames(classes.socialIcons, classes.right)}>
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
                                </GridItem>
                            </GridContainer>
                        </div>}>
                </Footer>
            </div>
        );
    }
}

export default withStyles(appFooterStyle)(AppFooter);
