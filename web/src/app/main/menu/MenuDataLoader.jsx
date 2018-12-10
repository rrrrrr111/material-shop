import {mapMenuToProps, MENU_DATA, RELOAD_MENU_DATA_ERROR, START_RELOAD_MENU_DATA} from "app/main/menu/reducer";
import {connect} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";
import {dispatch} from "store";

class MenuDataLoader extends React.PureComponent {

    componentDidMount() {
        if (!this.props.ui.loaded && !this.props.ui.loading) {
            this.reloadData();
        }
    }

    reloadData = () => {
        dispatch(START_RELOAD_MENU_DATA)
            .then(() => {
                const shopKey = util.global.getSiteConfigSync().shopKey;
                return util.ajax.localGet("/configurable/" + shopKey + "/menu.json");
            })
            .then((response) => {
                if (response.success) {
                    dispatch(MENU_DATA, response.items);
                } else {
                    dispatch(RELOAD_MENU_DATA_ERROR, response);
                }
            });
    };

    render() {
        const {data, ui, ...rest} = this.props;
        return (  // клонируем все дочерние и передаем им доп пропертя
            React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {
                    ...rest,
                    menuData: data,
                    menuUi: ui
                });
            })
        );
    }
}

export default connect(mapMenuToProps)(MenuDataLoader);
