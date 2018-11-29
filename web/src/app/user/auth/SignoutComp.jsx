import {USER_LOGGED_OUT, USER_START_LOADING} from "app/user/reducer";
import {connect} from "app/utils/functionUtil";
import util from "app/utils/util"
import React from "react";
import {dispatch} from "store";

class SignoutComp extends React.PureComponent {

    componentDidMount() {

        if (this.props.ui.loaded) {
            SignoutComp.signout(true);
        } else {
            SignoutComp.afterSignOut(true);
        }
    }

    render() {
        return null;
    }

    static signout = (backToPreviousUrl) => {
        dispatch(USER_START_LOADING)
            .then(() => {
                return util.ajax.backendSignout()
            })
            .then(() => {
                dispatch(USER_LOGGED_OUT);
                SignoutComp.afterSignOut(backToPreviousUrl);
            });
    };

    static afterSignOut(backToPreviousUrl) {
        util.notify.signOut();
        if (backToPreviousUrl) {
            util.navigate.goToPreviousUrl();
        }
    }
}

const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(SignoutComp);
