import {SHOW_NOTIFY} from "app/common/message/notify/reducer";
import {dispatch} from "store";

export const SERVER_SIDE_ERROR = "Ошибка при обращении к серверу, попробуйте позже";

export const determineUserMessage = (message) => {
    switch (message) {
        case "Unknown error":
        case "Unauthorized":
            return SERVER_SIDE_ERROR;
        default:
            return message;
    }
};

const showNotify = function (text) {
    dispatch(SHOW_NOTIFY, text);
};

const notify = {

    signIn() {
        showNotify("Выполнен вход в аккаунт");
    },
    signOut() {
        showNotify("Выполнен выход из аккаунта");
    },
    cartEmpty() {
        showNotify("Корзина пуста");
    },
    addToCart() {
        showNotify("Товар добавлен к корзину");
    },
    dataSaved() {
        showNotify("Данные сохранены");
    },
    orderCreated(orderId) {
        showNotify(`Заказ №${orderId} размещен, ожидайте звонка оператора для подтверждения`);
    },
    passwordChanged() {
        showNotify("Ваш пароль изменен");
    },
};
export default notify;
