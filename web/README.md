#### Первичная настройка
    1. Установить Node.js, IntelliJ IDEA или др. IDE для работы с JavaScript, JSX, CSS
    2. В идее установить папку /src как папку исходников, иначе импорты криво подсвечиваются
    3. в настрйоках IDEA включить прямые импорты для JavaScript
    4. npm i

#### Структура
    `public` - папка с static ресурсами доступными через URL, не обрабатывается Webpack'ом при
        компиляции, не рекомендуется класть в нее ресурсы приложения, доступ к ней из приложения
        через %PUBLIC_URL% в html и process.env.PUBLIC_URL в JS
    `src` - для разработки, процессится Webpack'ом на предмет JS и CSS

#### Команды
Выполняются в папке /web/
    `npm i` - установка пакетов
    `npm run start --verbose` - запуск в режиме разработки через react-scripts, см скрипты в package.json, открываем http://localhost:3000
    `npm run start-wp --verbose` - (не актуально) запуск в режиме разработки через webpack, открываем http://localhost:3000
    `node server.js` - запуск серверной части (Бэкенд)
    `npm test` - запуск тестов
    `npm run build` - сборка для передачи на пром

#### Troubleshooting
    - SCSS файлы преобразуются в CSS только при перезапуске npm, но в онлайне при правках изменения подхватываются
      даже без перезагрузки страницы
    - переменные из .env подхватываются из только при перезапуске npm
    - переустановить все пакеты, грохнуть %USERPROFILE%\AppData\Roaming\npm, npm-cache и в проекте \node_modules
    - Если не запускается npm, установить актуальную версию NodeJS, очистить кэши `npm cache clean --force`
    - Если возникают циклические зависисмости между функциями, при страте приложения Object(...) is not a function

#### Используется
 [HTML, CSS, JavaScript](http://htmlbook.ru/css/cat/text)
 [React.js](https://reactjs.org/docs)
 [react-router](https://reacttraining.com/react-router/web/guides/philosophy)
 [path-to-regexp](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0)
 [Redux](https://redux.js.org/basics/store)
 [JSS (CSS in JS)](http://cssinjs.org)
 Node.js, npm
 [Material UI](https://material-ui.com/demos/app-bar/)
 [Creative Tim Material Kit Examples](https://demos.creative-tim.com/), https://demos.creative-tim.com/material-kit-pro/presentation.html
 [react-number-format](https://github.com/s-yadav/react-number-format)
 [react-text-mask](https://github.com/text-mask/text-mask)
 [Lodash](https://lodash.com/docs/)
 [Axios](https://github.com/axios/axios)
 [immutability-helper](https://github.com/kolodny/immutability-helper)
 [Webpack](https://webpack.js.org/concepts/)
 [Babel](https://babeljs.io/docs/en/)

