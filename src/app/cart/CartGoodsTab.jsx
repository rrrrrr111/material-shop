import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import AppIcon from "app/common/icon/AppIcon";
import {iconButtonColor} from "app/common/styles";
import util from "app/utils/util"
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import Button from "app/common/button/Button";
import Table from "lib/components/Table/Table";
import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

class CartGoodsTab extends React.Component {
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
                    price: "1 093 232 p."
                },
                {
                    id: 2,
                    image: "000/000/product2.jpg",
                    link: "/goods/spring_jacket_p-2",
                    name: "Spring Jacket as dasd asdaSD;Asldj;skldfgj;sld ksdf;g jskdf;gkljs df;glksjdfg;l ksd;flkg sjdf;lgsjd;f lkjsdf;lkj ;sldkgj;slkdf",
                    quantity: 3,
                    price: "32 p."
                },
                {
                    id: 3,
                    image: "000/000/product1.jpg",
                    link: "/goods/spri__________SD_asd_ng_jacket_p-3",
                    name: "Spring Jacket",
                    quantity: 1,
                    price: "3 232 p."
                },
            ]
        };
    }

    render() {
        const {classes, history} = this.props;
        return (
            <Card className={classes.ordersTab}>
                <CardBody>
                    <Table
                        tableHead={[
                            "", "Наименование", "Количество", "Цена", ""
                        ]}
                        tableData={this.state.cartGoods.map((item) => {
                            return [
                                <div className={classes.imgContainer}>
                                    <img src={util.link.productImg(item.image)} alt="..." className={classes.img}/>
                                </div>
                                ,
                                <Link to={item.link} className={classes.goodsName}>
                                    {item.name}
                                </Link>
                                ,
                                <span>
                                    {item.quantity}
                                </span>
                                ,
                                <span className={classes.price}>
                                    {item.price}
                                </span>
                                ,
                                <Button simple justIcon size="sm" color={iconButtonColor}>
                                    <AppIcon name="fas fa-trash-alt"/>
                                </Button>
                            ];
                        })}
                        customCellClasses={[classes.textCenter, classes.textRight, classes.textCenter]}
                        customClassesForCells={[0, 3, 4]}
                        customHeadCellClasses={[classes.textCenter, classes.textRight, classes.textCenter]}
                        customHeadClassesForCells={[0, 3, 4]}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(userCartStyle)(withRouter(CartGoodsTab));
