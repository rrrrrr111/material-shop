// константы

const PRIMARY_COLOR = "primary";
const INFO_COLOR = "info";
const SUCCESS_COLOR = "success";
const WARNING_COLOR = "warning";
const DANGER_COLOR = "danger";
const TRANSPARENT_COLOR = "transparent";
const WHITE_COLOR = "white";
const ROSE_COLOR = "rose";
const DARK_COLOR = "dark";
const SOCIAL_VK_COLOR = "#4c75a3";

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

// общие классы

const vkColor = {
    backgroundColor: SOCIAL_VK_COLOR,
    "&:hover": {
        backgroundColor: SOCIAL_VK_COLOR,
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
    SOCIAL_VK_COLOR,

    notificationColor,
    notificationPlace,

    menuInitialColor,
    menuAfterScrollColor,
    dropdownHoverColor,
    headerParallaxFilterColor,

    popupHeaderColor,
    buttonColor,
    vkColor,
};
