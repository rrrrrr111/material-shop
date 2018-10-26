
Структура
    public - папка с static ресурсами доступными через URL, не обрабатывается Webpack'ом при
        компиляции, не рекомендуется класть в нее ресурсы приложения, доступ к ней из приложения
        через %PUBLIC_URL% в html и process.env.PUBLIC_URL в JS
    src - для разработки, процессится Webpack'ом на предмет JS и CSS

Команды
    npm i - установка скриптов
    npm run start - запуск в режиме разработки, см скрипты в package.json, http://localhost:3000
    npm test - запуск тестов
    npm run build - сборка для передачи на пром

Первичная настройка
    1. npm i
    2. В идее установить папку /src как папку исходников, иначе импорты криво подсвечиваются
    3. в настрйоках IDEA включить прямые импорты для JavaScript

Troubleshooting
    - SCSS файлы преобразуются в CSS только при перезапуске npm run start, в онлайне при правках не подхватываются

Используется
    - HTML, CSS, JavaScript http://htmlbook.ru/css/cat/text
    - React.js https://reactjs.org/docs
    - react-router https://reacttraining.com/react-router/web/guides/philosophy
    - Redux https://redux.js.org/basics/store
    - JSS (CSS in JS) http://cssinjs.org
    - Node.js, npm
    - Material UI https://material-ui.com/demos/app-bar/
    - Creative Tim Material Kit https://demos.creative-tim.com/, https://demos.creative-tim.com/material-kit-pro/presentation.html
    - react-number-format, react-text-mask
    - Lodash https://lodash.com/docs/
