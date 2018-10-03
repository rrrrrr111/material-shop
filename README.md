
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
    - React.js -
    - react-router
    - Redux -
    - JSS
    - Node.js
    - Material UI -
    - Creative Tim Material Kit https://demos.creative-tim.com/
