import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import Button from "app/common/button/Button";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import GridContainer from "app/common/grid/GridContainer";
import GridItem from "app/common/grid/GridItem";
import AppIcon from "app/common/icon/AppIcon";
import CustomInput from "app/common/input/CustomInput";
import LocalLink from "app/common/misc/LocalLink";
import Price from "app/common/misc/Price";
import {iconButtonColor} from "app/common/style/styles";
import Table from "app/common/table/CustomTable";
import util from "app/utils/util"
import toNumber from 'lodash/toNumber'
import React from "react";
import {withRouter} from "react-router";

class CartGoodsTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cartGoods: [
                {
                    id: 1,
                    image: "000/000/product3.jpg",
                    link: "/goods/spring_jacasdf_asdf_asdf_aket_p-1",
                    name: "Spring Jacket",
                    quantity: 1,
                    price: 1093232
                },
                {
                    id: 2,
                    image: "000/000/product2.jpg",
                    link: "/goods/spring_jacket_p-2",
                    name: "Spring Jacket as dasd asdaSD;Asldj;skldfgj;sld ksdf;g jskdf;gkljs df;glksjdfg;l ksd;flkg sjdf;lgsjd;f lkjsdf;lkj ;sldkgj;slkdf",
                    quantity: 3,
                    price: 32
                },
                {
                    id: 3,
                    image: "000/000/product1.jpg",
                    link: "/goods/spri__________SD_asd_ng_jacket_p-3",
                    name: "Spring Jacket",
                    quantity: 1,
                    price: 3232
                },
                {
                    id: 4,
                    image: "000/000/product1.jpg",
                    link: "/goods/spri__________SD_asd_ng_jacket_p-3",
                    name: "Spring Jacket",
                    quantity: 1,
                    price: 3232
                },
            ]
        };

        this.handleClickMinus = this.handleClickMinus.bind(this);
        this.handleClickPlus = this.handleClickPlus.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    handleClickMinus = (e, index) => {
        const newQuantity = Math.max(this.getGoods()[index].quantity - 1, 0);
        this.changeQuantity(index, newQuantity);
    };

    getGoods() {
        return this.state.cartGoods;
    }

    handleClickPlus = (e, index) => {
        const newQuantity = Math.min(this.getGoods()[index].quantity + 1, 9999);
        this.changeQuantity(index, newQuantity);
    };
    handleChangeQuantity = (e, index) => {
        this.changeQuantity(index, toNumber(e.target.value));
    };

    changeQuantity(index, newQuantity) {
        const goods = this.getGoods();
        goods.splice(index, 1, {...goods[index], quantity: newQuantity});
        this.setState({...goods});
    }

    handleClickDelete = (e, index) => {
        const goods = this.getGoods();
        goods.splice(index, 1);
        this.setState({cartGoods: [...goods]});
    };

    render() {
        const {classes} = this.props;
        const goods = this.state.cartGoods;

        if (goods.length === 0) {
            return (
                <Card className={classes.goodsTableContainer}>
                    <CardBody>
                        <h3>Корзина пуста</h3>
                    </CardBody>
                </Card>
            )
        }
        const totalQuantity = goods.map(item => item.quantity).reduce((a, b) => a + b, 0);

        return (
            <Card className={classes.goodsTableContainer}>
                <CardBody>
                    <h3>Корзина</h3>
                    <Table tableShopping
                           tableHead={[
                               "", "Наименование", "Цена", "Количество", ""
                           ]}
                           tableData={goods.map((item, index) => {
                               return [
                                   <div className={classes.imgCell}>
                                       <div className={classes.imgContainer}>
                                           <img src={util.link.productImg(item.image)} alt="..."
                                                className={classes.img}/>
                                       </div>
                                   </div>
                                   ,
                                   <LocalLink to={item.link} className={classes.goodsName}>
                                       {item.name}
                                   </LocalLink>
                                   ,
                                   <Price value={item.price}/>
                                   ,
                                   <span className={classes.nowrap}>
                                        <Button simple justIcon size="sm"
                                                color={iconButtonColor}
                                                onClick={this.handleClickPlus.bind(this, null, index)}>
                                            <AppIcon name="fas fa-plus"/>
                                        </Button>
                                        <CustomInput
                                            formControlProps={{
                                                width: "10px",
                                                className: classes.quantityCustomInput
                                            }}
                                            inputClasses={classes.quantityInput}
                                            inputProps={{
                                                autoComplete: "off",
                                                value: item.quantity,
                                                onChange: (e) => this.handleChangeQuantity(e, index),
                                            }}
                                            numberProps={{
                                                allowNegative: false,
                                                decimalScale: 0,
                                                thousandSeparator: ' ',
                                                maxLength: 4,
                                            }}
                                        />
                                        <Button simple justIcon size="sm"
                                                color={iconButtonColor}
                                                onClick={this.handleClickMinus.bind(this, null, index)}>
                                            <AppIcon name="fas fa-minus"/>
                                        </Button>
                                    </span>
                                   ,
                                   <Button simple justIcon size="sm" color={iconButtonColor}
                                           onClick={this.handleClickDelete.bind(this, null, index)}>
                                       <AppIcon name="fas fa-trash-alt"/>
                                   </Button>
                               ];
                           })}
                           tableFooter={
                               <GridContainer className={classes.tableFooterContainer}>
                                   <GridItem container xs={12} sm zeroMinWidth justify="center">
                                       <Grid item>
                                           <h4 className={classes.nowrap}>
                                               В
                                               корзине {totalQuantity} {util.declension.inclineGoods(totalQuantity)} на
                                               сумму:
                                           </h4>
                                       </Grid>
                                   </GridItem>
                                   <GridItem container xs={12} sm zeroMinWidth justify="center">
                                       <Grid item>
                                           <Price big value={
                                               goods.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0)
                                           }/>
                                       </Grid>
                                   </GridItem>
                               </GridContainer>
                           }
                           customCellClasses={[classes.textCenter, classes.textRight, classes.textRight, classes.textCenter]}
                           customClassesForCells={[0, 2, 3, 4]}
                           customHeadCellClasses={[classes.textCenter, classes.textRight, classes.textRight, classes.textCenter]}
                           customHeadClassesForCells={[0, 2, 3, 4]}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(userCartStyle)(withRouter(CartGoodsTab));
