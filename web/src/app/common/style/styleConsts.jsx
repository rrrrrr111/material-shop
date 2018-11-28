import {title} from "app/common/style/themeStyles.jsx";

// константы

// цвет
export const primaryColor = "#9c27b0";
export const secondaryColor = "#fafafa";
export const warningColor = "#ff9800";
export const dangerColor = "#f44336";
export const successColor = "#4caf50";
export const infoColor = "#00acc1";
export const roseColor = "#e91e63";
export const grayColor = "#999999";

export const blackColor = "#3C4858";

export const PRIMARY_COLOR_KEY = "primary"; // имена соотв классов (classes["primary"])
export const INFO_COLOR_KEY = "info";
export const SUCCESS_COLOR_KEY = "success";
export const WARNING_COLOR_KEY = "warning";
export const DANGER_COLOR_KEY = "danger";
export const TRANSPARENT_COLOR_KEY = "transparent";
export const WHITE_COLOR_KEY = "white";
export const ROSE_COLOR_KEY = "rose";
export const DARK_COLOR_KEY = "dark";

export const MAIN_COLOR_KEYS = [PRIMARY_COLOR_KEY, INFO_COLOR_KEY, SUCCESS_COLOR_KEY, WARNING_COLOR_KEY, DANGER_COLOR_KEY, TRANSPARENT_COLOR_KEY,
    WHITE_COLOR_KEY, ROSE_COLOR_KEY, DARK_COLOR_KEY];

export const TWITTER_COLOR_KEY = "twitter";
export const FACEBOOK_COLOR_KEY = "facebook";
export const GOOGLE_COLOR_KEY = "google";
export const LINKEDIN_COLOR_KEY = "linkedin";
export const PINTEREST_COLOR_KEY = "pinterest";
export const YOUTUBE_COLOR_KEY = "youtube";
export const TUMBLR_COLOR_KEY = "tumblr";
export const GITHUB_COLOR_KEY = "github";
export const BEHANCE_COLOR_KEY = "behance";
export const DRIBBBLE_COLOR_KEY = "dribbble";
export const REDDIT_COLOR_KEY = "reddit";
export const INSTAGRAM_COLOR_KEY = "instagram";
export const VK_COLOR_KEY = "vk";

export const SOCIAL_COLOR_KEYS = [TWITTER_COLOR_KEY, FACEBOOK_COLOR_KEY, GOOGLE_COLOR_KEY, LINKEDIN_COLOR_KEY, PINTEREST_COLOR_KEY, YOUTUBE_COLOR_KEY,
    TUMBLR_COLOR_KEY, GITHUB_COLOR_KEY, BEHANCE_COLOR_KEY, DRIBBBLE_COLOR_KEY, REDDIT_COLOR_KEY, INSTAGRAM_COLOR_KEY, VK_COLOR_KEY];

export const ALL_COLOR_KEYS = MAIN_COLOR_KEYS.concat(SOCIAL_COLOR_KEYS);
export const ALL_PLACEMENTS = ["bottom", "top", "right", "left", "bottom-start", "bottom-end", "top-start", "top-end", "right-start", "right-end", "left-start", "left-end"];

// стили приложения

export const notificationColor = ROSE_COLOR_KEY;
export const notificationPlace = "bc";

export const font = '"Roboto", "Helvetica", "Arial", sans-serif';
export const boldFont = '"Roboto Slab", "Times New Roman", serif';

export const menuInitialColor = TRANSPARENT_COLOR_KEY;
export const menuAfterScrollColor = ROSE_COLOR_KEY;
export const dropdownHoverColor = menuAfterScrollColor;  // пункт меню при наведении
export const headerParallaxFilterColor = ROSE_COLOR_KEY;

export const popupHeaderColor = ROSE_COLOR_KEY; // заголовок попапа
export const buttonColor = ROSE_COLOR_KEY;      // кнопки
export const iconButtonColor = BEHANCE_COLOR_KEY;  // кнопки иконки
export const navPillsColor = ROSE_COLOR_KEY;  // swipable табы (профиль пользователя)
export const tabHeaderColor = ROSE_COLOR_KEY;  // обычные табы
export const accordionActiveColor = ROSE_COLOR_KEY; // выделенный элемент аккордиона
export const circularProgressColor = ROSE_COLOR_KEY; // круглый значек загрузки  // todo разделить на цвета и классы

export const drawerWidth = 260;

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
export const helperStyles = theme => ({
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
