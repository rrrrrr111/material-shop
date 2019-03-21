#### First setup
1. Install
* Node.js,
* IntelliJ IDEA or other IDE supporting JavaScript, CSS, JSX
2. In the IDEA set the `/src` and `/public` folders as source folders, otherwise the imports are crookedly highlighted
3. In IDEA settings, enable direct imports for javascript
4. Run `npm i` in the `/web/` folder

#### Structure
    `public` - a folder with static resources accessible via a relative URL from app, it is not processed by Webpack while compilation, it is not recommended to put application resources into it. It is accessible from the application via %PUBLIC_URL% in html and process.env.PUBLIC_URL in JS
    `src` - for development, processed by Webpack for JS and CSS

#### Useful commands
Executed in `/web/` folder
    `npm i` - package installation
    `npm run start --verbose` - launch in development mode via react-scripts, see the scripts in package.json, open `http://localhost:3000`
    `npm run start-wp --verbose` - (not relevant) start in development mode via webpack, open `http://localhost:3000`
    `node server.js` - start the server part (Backend)
    `npm test` - run tests
    `npm run build` - build distibution/production package

#### Troubleshooting
    - SCSS files are converted to CSS only when npm is restarted, but online when changes are made, changes are picked up
      even without reloading the page
    - variables from .env are picked up from only when npm is restarted
    - reinstall all packages, crash npm-cache in `%USERPROFILE%\AppData\Roaming\npm` and in the project `\node_modules` folder
    - If npm does not start, install the current version of NodeJS, clear the caches `npm cache clean --force`
    - If there are cyclic dependencies between functions, with the application stratum Object (...) is not a function

#### Used
* [HTML, CSS, JavaScript] (http://htmlbook.ru/css/cat/text)
* [React.js] (https://reactjs.org/docs)
* [react-router] (https://reacttraining.com/react-router/web/guides/philosophy)
* [path-to-regexp] (https://github.com/pillarjs/path-to-regexp/tree/v1.7.0)
* [Redux] (https://redux.js.org/basics/store)
* [redux-thunk] (https://github.com/reduxjs/redux-thunk)
* [JSS (CSS in JS)] (http://cssinjs.org)
* Node.js, npm
* [Material UI] (https://material-ui.com/demos/app-bar/)
* [Creative Tim Material Kit Examples] (https://demos.creative-tim.com/), https://demos.creative-tim.com/material-kit-pro/presentation.html
* [react-number-format] (https://github.com/s-yadav/react-number-format)
* [react-text-mask] (https://github.com/text-mask/text-mask)
* [Lodash] (https://lodash.com/docs/)
* [Axios] (https://github.com/axios/axios)
* [immutability-helper] (https://github.com/kolodny/immutability-helper)
* [Webpack] (https://webpack.js.org/concepts/)
* [Babel] (https://babeljs.io/docs/en/)
