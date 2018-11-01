
#Структура
    `public` - папка с static ресурсами доступными через URL, не обрабатывается Webpack'ом при
        компиляции, не рекомендуется класть в нее ресурсы приложения, доступ к ней из приложения
        через %PUBLIC_URL% в html и process.env.PUBLIC_URL в JS
    `src` - для разработки, процессится Webpack'ом на предмет JS и CSS

#Команды
    `npm i` - установка пакетов
    `npm i webpack -g` - установка webpack
    `npm run start --verbose` - запуск в режиме разработки через react-scripts, см скрипты в package.json, открываем http://localhost:3000

    `node server.js` - запуск серверной части (Бэкенд)
    `npm test` - запуск тестов
    `npm run build` - сборка для передачи на пром

#Первичная настройка
    1. Установить Node.js, IntelliJ IDEA или др. IDE для работы с JavaScript, JSX, CSS
    2. В идее установить папку /src как папку исходников, иначе импорты криво подсвечиваются
    3. в настрйоках IDEA включить прямые импорты для JavaScript
    4. npm i
    5. npm i webpack -g

#Troubleshooting
    - SCSS файлы преобразуются в CSS только при перезапуске npm run start, в онлайне при правках не подхватываются
        - аналогично с переменными из .env

#Используется
    - HTML, CSS, JavaScript http://htmlbook.ru/css/cat/text
    - React.js https://reactjs.org/docs
    - react-router https://reacttraining.com/react-router/web/guides/philosophy
    - Redux https://redux.js.org/basics/store
    - JSS (CSS in JS) http://cssinjs.org
    - Node.js, npm
    - Material UI https://material-ui.com/demos/app-bar/
    - Creative Tim Material Kit Examples https://demos.creative-tim.com/, https://demos.creative-tim.com/material-kit-pro/presentation.html
    - react-number-format, react-text-mask
    - Lodash https://lodash.com/docs/
    - immutability-helper https://github.com/kolodny/immutability-helper
    - Webpack
    - Babel https://babeljs.io/docs/en/

