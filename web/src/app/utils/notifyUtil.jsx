import {SHOW_NOTIFY} from "app/common/message/notify/reducer";
import {action} from "app/utils/functionUtil";
import {store} from "store";

const showNotify = function (text) {
    store.dispatch((dispatch) => {
        dispatch(action(SHOW_NOTIFY, text));
    });
};

const notify = {

    signIn() {
        showNotify("Выполнен вход в аккаунт");
    },
    signOut() {
        showNotify("Выполнен выход");
    },
    cartEmpty() {
        showNotify("Ваша корзина пуста");
    },
    addToCart() {
        showNotify("Товар добавлен к корзину");
    },
    dataSaved() {
        showNotify("Данные сохранены");
    },
};
export default notify;
