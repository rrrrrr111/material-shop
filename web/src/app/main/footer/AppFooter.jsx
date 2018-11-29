import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/theme/button/Button";
import GridContainer from "app/common/grid/GridContainer";
import GridItem from "app/common/grid/GridItem";
import AppIcon from "app/common/icon/AppIcon";
import LocalLink from "app/common/misc/LocalLink";

import appFooterStyle from "app/main/footer/appFooterStyle.jsx";
import classNames from "classnames";
import Footer from "app/common/theme/footer/Footer.jsx";
import React from "react";

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
                                    <p><LocalLink nav to="/info/mission"> Миссия </LocalLink></p>
                                    <p><LocalLink nav to="/info/history"> История </LocalLink></p>
                                    <p><LocalLink nav to="/info/advantage"> Преимущества </LocalLink></p>
                                    <p><LocalLink nav to="/info/requisites"> Реквизиты </LocalLink></p>
                                    <p><LocalLink nav to="/info/contacts"> Контакты </LocalLink></p>
                                    <p><LocalLink nav to="/info/news"> Новости </LocalLink></p>
                                    <p><LocalLink nav to="/info/"> Отзывы </LocalLink></p>
                                    <p><LocalLink nav to="/info/blog"> Блог </LocalLink></p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Вопросы и ответы</h5>
                                    <p><LocalLink nav to="/info/how-to#order"> Как сделать заказ </LocalLink></p>
                                    <p><LocalLink nav to="/info/how-to#pay"> Как оплатить товар </LocalLink></p>
                                    <p><LocalLink nav to="/info/gift-certificates"> Подарочные
                                        сертификаты </LocalLink></p>
                                    <p><LocalLink nav to="/info/delivery"> Условия доставки </LocalLink></p>
                                    <p><LocalLink nav to="/info/bonuses"> Система бонусов </LocalLink></p>
                                    <p><LocalLink nav to="/info/returns"> Возврат товара </LocalLink></p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Личный кабинет</h5>
                                    <p>
                                        <LocalLink nav to="/auth/signin" modal> Вход </LocalLink>
                                        /
                                        <LocalLink nav to="/auth/signup" modal> Регистрация </LocalLink>
                                    </p>
                                    <p><LocalLink nav to="/user/profile"> Профиль пользователя </LocalLink></p>
                                    <p><LocalLink nav to="/cart/goods"> Корзина </LocalLink></p>
                                    <p><LocalLink nav to="/user/orders"> История заказов </LocalLink></p>
                                    <p><LocalLink nav to="/user/settings"> Настройки </LocalLink></p>
                                    <p><LocalLink nav to="/user/password"> Смена пароля </LocalLink></p>
                                    <p><LocalLink nav to="/auth/signout" modal> Выход </LocalLink></p>
                                </GridItem>
                                <GridItem xs={6} sm={3} md={2}>
                                    <h5>Сервис</h5>
                                    <p><LocalLink nav to="/info/"> Напишите нам </LocalLink></p>
                                    <p><LocalLink nav to="/info/"> Торговля оптом </LocalLink></p>
                                    <p><LocalLink nav to="/subscribe/sales-and-news"> Подписка на акции, скидки,
                                        распродажи и новости </LocalLink></p>
                                    <p><LocalLink nav to="/info/privacy-policy"> Политика
                                        конфиденциальности </LocalLink></p>
                                </GridItem>
                            </GridContainer>
                            <hr/>
                            <GridContainer>
                                <GridItem xs={12} sm={9} md={9}>
                                    <div className={classNames(classes.copyRightInfo)}>
                                        &copy; {1900 + new Date().getYear()}{" "}
                                        <LocalLink to="/" className={classes.aClasses}> LC Cosmetics </LocalLink>{" "}
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
                                        <LocalLink to="/info/privacy-policy" className={classes.aClasses}> политики
                                            конфиденциальности </LocalLink>{" "}
                                        и
                                        <LocalLink to="/info/user-agreement"
                                                   className={classes.aClasses}> пользовательского
                                            соглашения </LocalLink>{" "}
                                        каждый раз, когда оставляете свои данные в любой
                                        форме обратной связи на сайте LC Cosmetics.
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={3} md={3}>
                                    <div className={classNames(classes.socialIcons, classes.right)}>
                                        <ul>
                                            <li>
                                                <Button justIcon link className={classes.iconSocial}>
                                                    <AppIcon name="fab fa-vk"/>
                                                </Button>
                                            </li>
                                            <li>
                                                <Button justIcon link className={classes.iconSocial}>
                                                    <AppIcon name="fab fa-facebook-square"/>
                                                </Button>
                                            </li>
                                            <li>
                                                <Button justIcon link className={classes.iconSocial}>
                                                    <AppIcon name="fab fa-instagram"/>
                                                </Button>
                                            </li>
                                            <li>
                                                <Button justIcon link className={classes.iconSocial}>
                                                    <AppIcon name="fab fa-whatsapp"/>
                                                </Button>
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
