import React from "react";
import util from "app/utils/util"
import Notify from "app/common/snackbar/notify/Notify";

class SignoutComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            signOutNotify: false,
        };
        this.handleShowSignOutNotify = this.handleShowSignOutNotify.bind(this);
        this.handleCloseSignOutNotify = this.handleCloseSignOutNotify.bind(this);
    }

    handleShowSignOutNotify() {
        util.notify.showNotify(this, "signOutNotify");
    }

    handleCloseSignOutNotify() {
        util.notify.closeNotify(this, "signOutNotify");
    }

    componentDidMount() {
        // todo ajax signout

        this.handleShowSignOutNotify();
        util.navigate.goToPreviousUrl(this.props.location, this.props.history);
    }

    render() {
        return (
            <Notify text="Выполнен выход"   // todo сделать единую нотификацию через Redux
                    isOpen={this.state.signOutNotify}
                    onClose={this.handleCloseSignOutNotify}
            />
        );
    }
}

export default (SignoutComponent);
