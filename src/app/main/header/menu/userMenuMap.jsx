const userMenuMap = [
    {id: 0, name: "Профиль пользователя", to: "/user/profile", iconComponent: "Face"},
    {id: 1, name: "Корзина", to: "/user/cart", iconComponent: "ShoppingCart"},
    {id: 2, name: "История заказов", to: "/user/orders", iconComponent: "History"},
    {id: 3, name: "Настройки", to: "/user/settings", iconComponent: "SettingsApplications"},
    {id: 4, name: "Смена пароля", to: "/user/password", iconComponent: "Fingerprint"},
    {id: 5, name: "Выход", to: "/auth/signout", iconName: "fas fa-sign-out-alt"},
];

export default userMenuMap;
