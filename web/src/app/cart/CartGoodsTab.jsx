import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {CHANGE_QUANTITY, mapCartToProps, REMOVE_FROM_CART} from "app/cart/reducer";
import userCartStyle from "app/cart/userCartStyle";
import Button from "app/common/theme/button/Button";
import Card from "app/common/theme/card/Card.jsx";
import CardBody from "app/common/theme/card/CardBody.jsx";
import GridContainer from "app/common/grid/GridContainer";
import GridItem from "app/common/grid/GridItem";
import AppIcon from "app/common/icon/AppIcon";
import CustomInput from "app/common/theme/input/CustomInput";
import LocalLink from "app/common/misc/LocalLink";
import Price from "app/common/misc/Price";
import {iconButtonColor} from "app/common/style/styleConsts";
import Table from "app/common/theme/table/CustomTable";
import {connect} from "app/utils/functionUtil";
import util from "app/utils/util"
import toNumber from 'lodash/toNumber'
import React from "react";
import {withRouter} from "react-router";
import {dispatch} from "store";

class CartGoodsTab extends React.PureComponent {
    constructor(props) {
        super(props);
        // this.state = {
        //     cartGoodsList: [
        //         {
        //             productId: 1,
        //             image: "000/000/000[2:jpg, 3]",
        //             link: "/goods/spring_jacasdf_asdf_asdf_aket_p-1",
        //             name: "Spring Jacket",
        //             quantity: 1,
        //             price: 1093232
        //         }
        //     ]
        //};

        this.handleClickMinus = this.handleClickMinus.bind(this);
        this.handleClickPlus = this.handleClickPlus.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    handleClickMinus = (e, index) => {
        const newQuantity = Math.max(this.getCartGoodsList()[index].quantity - 1, 0);
        this.changeQuantity(index, newQuantity);
    };

    handleClickPlus = (e, index) => {
        const newQuantity = Math.min(this.getCartGoodsList()[index].quantity + 1, 9999);
        this.changeQuantity(index, newQuantity);
    };

    handleChangeQuantity = (e, index) => {
        this.changeQuantity(index, toNumber(e.target.value));
    };

    getCartGoodsList() {
        return this.props.data.cartGoodsList;
    }

    changeQuantity(index, newQuantity) {
        dispatch(CHANGE_QUANTITY, {
            ...this.getCartGoodsList()[index],
            quantity: newQuantity
        });
    }

    handleClickDelete = (e, index) => {
        dispatch(REMOVE_FROM_CART, this.getCartGoodsList()[index]);
    };

    render() {
        const {classes} = this.props;
        const cartGoodsList = this.getCartGoodsList();
        const {
            totalAmount,
            totalQuantity
        } = this.props.data;

        if (!totalQuantity) {
            return (
                <Card className={classes.goodsTableContainer}>
                    <CardBody>
                        <h3>Корзина пуста</h3>
                    </CardBody>
                </Card>
            )
        }

        return (
            <Card className={classes.goodsTableContainer}>
                <CardBody>
                    <h3>Корзина</h3>
                    <Table tableShopping
                           tableHead={[
                               "", "Наименование", "Цена", "Количество", ""
                           ]}
                           tableData={cartGoodsList.map((item, index) => {
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
                                   <Price bold value={item.price}/>
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
                                                value: item.quantity + "",
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
                                           <h4>
                                               В корзине {totalQuantity} {util.declension.inclineGoods(totalQuantity)}:
                                           </h4>
                                       </Grid>
                                   </GridItem>
                                   <GridItem container xs={12} sm zeroMinWidth justify="center">
                                       <Grid item>
                                           <Price bold big value={totalAmount}/>
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

export default connect(mapCartToProps)(withStyles(userCartStyle)(withRouter(CartGoodsTab)));
