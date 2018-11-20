import {USER_LOGGED_OUT} from "app/user/reducer";
import {action} from "app/utils/functionUtil";
import util from "app/utils/util"
import React from "react";
import {connect} from "react-redux";
import {store} from "store";

class SignoutComp extends React.PureComponent {

    componentDidMount() {

        const history = this.props.history;
        if (this.props.ui.authorized) {
            SignoutComp.signout(true, history);
        } else {
            SignoutComp.afterSignOut(true, history);
        }
    }

    render() {
        return null;
    }

    static signout = (goToPreviousUrl, history) => {
        util.ajax.backendSignout()
            .then(function () {

                store.dispatch(action(USER_LOGGED_OUT));
                SignoutComp.afterSignOut(goToPreviousUrl, history);
            });
    };

    static afterSignOut(goToPreviousUrl, history) {
        util.notify.signOut();
        if (goToPreviousUrl) {
            util.navigate.goToPreviousUrl(history);
        }
    }
}

const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(SignoutComp);
