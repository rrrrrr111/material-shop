const number2string = function (n, textForms) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
        return textForms[2];
    }
    if (n1 > 1 && n1 < 5) {
        return textForms[1];
    }
    if (n1 === 1) {
        return textForms[0];
    }
    return textForms[2];
};

const declension = {
    inclineGoods: (num) => {
        return number2string(num, ['товар', 'товара', 'товаров']);
    }
};
export default declension;
