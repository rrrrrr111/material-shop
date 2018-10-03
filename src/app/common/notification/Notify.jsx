import React from "react";
import Snackbar from "./snackbar/Snackbar";
import {notificationColor, notificationPlace} from "../styles";
import {Notifications} from "@material-ui/icons";

function Notify({...props}) {
    const {text, isOpen, onClose} = props;

    return (
        <Snackbar
            place={notificationPlace}
            color={notificationColor}
            icon={Notifications}
            message={text}
            open={isOpen}
            onClose={onClose}
            close
        />
    );
}

export default (Notify);
