import {title} from "lib/assets/jss/material-kit-pro-react.jsx";

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

const MAIN_COLORS = [PRIMARY_COLOR, INFO_COLOR, SUCCESS_COLOR, WARNING_COLOR, DANGER_COLOR, TRANSPARENT_COLOR,
    WHITE_COLOR, ROSE_COLOR, DARK_COLOR];

const TWITTER_COLOR = "twitter";
const FACEBOOK_COLOR = "facebook";
const GOOGLE_COLOR = "google";
const LINKEDIN_COLOR = "linkedin";
const PINTEREST_COLOR = "pinterest";
const YOUTUBE_COLOR = "youtube";
const TUMBLR_COLOR = "tumblr";
const GITHUB_COLOR = "github";
const BEHANCE_COLOR = "behance";
const DRIBBBLE_COLOR = "dribbble";
const REDDIT_COLOR = "reddit";
const INSTAGRAM_COLOR = "instagram";
const VK_COLOR = "vk";

const SOCIAL_COLORS = [TWITTER_COLOR, FACEBOOK_COLOR, GOOGLE_COLOR, LINKEDIN_COLOR, PINTEREST_COLOR, YOUTUBE_COLOR,
    TUMBLR_COLOR, GITHUB_COLOR, BEHANCE_COLOR, DRIBBBLE_COLOR, REDDIT_COLOR, INSTAGRAM_COLOR, VK_COLOR];

const ALL_COLORS = MAIN_COLORS.concat(SOCIAL_COLORS);
const ALL_PLACEMENTS = ["bottom", "top", "right", "left", "bottom-start", "bottom-end", "top-start", "top-end", "right-start", "right-end", "left-start", "left-end"];

// стили приложения

const notificationColor = ROSE_COLOR;
const notificationPlace = "bc";

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const boldFont = '"Roboto Slab", "Times New Roman", serif';

const menuInitialColor = TRANSPARENT_COLOR;
const menuAfterScrollColor = ROSE_COLOR;
const dropdownHoverColor = menuAfterScrollColor;  // пункт меню при наведении
const headerParallaxFilterColor = ROSE_COLOR;

const popupHeaderColor = ROSE_COLOR; // заголовок попапа
const buttonColor = ROSE_COLOR;      // кнопки
const iconButtonColor = BEHANCE_COLOR;  // кнопки иконки
const navPillsColor = ROSE_COLOR;  // swipable табы (профиль пользователя)
const tabHeaderColor = ROSE_COLOR;  // обычные табы
const accordionActiveColor = ROSE_COLOR; // выделенный элемент аккордиона
const circularProgressColor = ROSE_COLOR; // круглый значек загрузки  // todo разделить на цвета и классы

const simpleStyles = theme => ({
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
    justifyContentBetween: { // по вертикали
        WebkitBoxPack: "justify !important",
        justifyContent: "space-between !important",
        MsFlexPack: "justify !important",
    },
    justifyContentCenter: {
        WebkitBoxPack: "center !important",
        MsFlexPack: "center !important",
        justifyContent: "center !important"
    },
    // выравнивание для span или текста
    textCenter: {
        textAlign: "center"
    },
    textRight: {
        textAlign: "right"
    },

    // не переносить lnline элементы на новую строку
    nowrap: {
        whiteSpace: "nowrap",
    },
});

// общие стили
const appStyles = theme => ({
    ...simpleStyles(theme),
    title,

    // растягивающийся контейнер по центру экрана, можно добавить maxWidth
    centeredContainer: {
        ...simpleStyles(theme).width100,
        ...simpleStyles(theme).alignCenter
    },

    // кнопки в подвале формы
    cardFooterButton: {
        margin: "30px 20px 20px 20px",
        float: "none",
        display: "block",
        ...simpleStyles(theme).alignCenter,
        [theme.breakpoints.up("sm")]: {
            "&.left": {
                ...simpleStyles(theme).left,
            },
            "&.right": {
                ...simpleStyles(theme).right,
            },
        },
    },

    // иконка в кнопке
    buttonRightIcon: {
        "&.fab,&.fas,&.far,&.fal,&.material-icons": { // больше добавоных классов для перекрытия дефолтного стиля
            margin: "-5px -10px -5px 10px",
            fontSize: "1.25rem",
        },

    },
    buttonLeftIcon: {
        "&.fab,&.fas,&.far,&.fal,&.material-icons": {
            margin: "-5px 10px -5px -10px",
            fontSize: "1.25rem",
        }
    },
});

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

    ALL_PLACEMENTS,

    notificationColor,
    notificationPlace,

    font,
    boldFont,

    menuInitialColor,
    menuAfterScrollColor,
    dropdownHoverColor,
    headerParallaxFilterColor,

    popupHeaderColor,
    buttonColor,
    iconButtonColor,
    navPillsColor,
    tabHeaderColor,
    accordionActiveColor,
    circularProgressColor,

    appStyles,
};
