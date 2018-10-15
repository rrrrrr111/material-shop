// константы

const PRIMARY_COLOR = "primary"; // имена соотв классов (classes["primary"])
const INFO_COLOR = "info";
const SUCCESS_COLOR = "success";
const WARNING_COLOR = "warning";
const DANGER_COLOR = "danger";
const TRANSPARENT_COLOR = "transparent";
const WHITE_COLOR = "white";
const ROSE_COLOR = "rose";
const DARK_COLOR = "dark";

const ALL_COLORS = [PRIMARY_COLOR, INFO_COLOR, SUCCESS_COLOR, WARNING_COLOR, DANGER_COLOR, TRANSPARENT_COLOR, WHITE_COLOR, ROSE_COLOR, DARK_COLOR];

// стили приложения

const notificationColor = ROSE_COLOR;
const notificationPlace = "bc";

const menuInitialColor = TRANSPARENT_COLOR;
const menuAfterScrollColor = ROSE_COLOR;
const dropdownHoverColor = menuAfterScrollColor;  // пункт меню при наведении
const headerParallaxFilterColor = ROSE_COLOR;

const popupHeaderColor = ROSE_COLOR;
const buttonColor = ROSE_COLOR;
const navPillsColor = ROSE_COLOR;

// общие стили
const appStyles = {
    width100: {
        width: "100%",
    },
    // выравнивание блока
    alignCenter: {
        marginLeft: "auto",
        marginRight: "auto",
    },
    right: {
        float: "right",
    },
    left: {
        float: "left",
    },
    // выравнивание для span или текста
    textCenter: {
        textAlign: "center"
    },
    textRight: {
        textAlign: "right"
    },

    cardFooterLeftButton: {
        float: "left",
        margin: "30px 20px 20px 20px",
    },
    cardFooterRightButton: {
        float: "right",
        margin: "30px 20px 20px 20px",
    },
};

export {
    PRIMARY_COLOR,
    INFO_COLOR,
    SUCCESS_COLOR,
    WARNING_COLOR,
    DANGER_COLOR,
    TRANSPARENT_COLOR,
    WHITE_COLOR,
    ROSE_COLOR,
    DARK_COLOR,
    ALL_COLORS,

    notificationColor,
    notificationPlace,

    menuInitialColor,
    menuAfterScrollColor,
    dropdownHoverColor,
    headerParallaxFilterColor,

    popupHeaderColor,
    buttonColor,
    navPillsColor,

    appStyles,
};
