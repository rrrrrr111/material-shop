const scrollGo = (element, to, duration) => {
    let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    let animateScroll = function () {
        currentTime += increment;
        element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
};
const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

const scrollY = function (y = 0) {
    window.scrollTo(0, y);
    document.body.scrollTop = y;
};

/**
 * Возвращает текущую позицию scroll по Y
 */
const getCurrentYScroll = () => {
    return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop;
};

/**
 * Переход на предыдущий URL, либо на начальную стринцу,
 * хак для корректной работы на предыдущем переходе из Link
 * нужно в state передать флаг modal
 */
const goToPreviousUrl = (location, history) => {
    if (location.state && location.state.local) {
        history.goBack();
        scrollY(location.state.yScroll);
    } else {
        history.push("/");
        scrollY(0);
    }
};

/**
 * Переход на URL
 */
const goToUrl = (url, history) => {
    history.push(url);
};

/**
 * Мягкая прокрутка к якорю на странице
 */
const smoothScrollTo = (e, targetId) => {
    if (window.location.pathname === "/sections") {
        const isMobile = navigator.userAgent.match(
            /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
        );
        if (isMobile) {
            // if we are on mobile device the scroll into view will be managed by the browser
        } else {
            e.preventDefault();
            const targetScroll = document.getElementById(targetId);
            scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
        }
    }
};

/**
 * Прокрутка к заголовку страницы, если открутка от заголовка больше указанной
 */
const scrollUp = (offsetEdge) => {
    if (getCurrentYScroll() > offsetEdge) { // не скролим если не далеко от верхушки
        scrollY(0);
    }
};

const navigate = {

    goToUrl: goToUrl,
    goToPreviousUrl: goToPreviousUrl,

    scrollUp: scrollUp,
    getCurrentYScroll: getCurrentYScroll,
};
export default navigate;
