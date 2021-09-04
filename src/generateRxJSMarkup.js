'use strict';

const generateImportMap = require('./generateImportMap');
module.exports = function (options) {
  const { projectName, cdn, framework } = options;

  const markup = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName} - RxJS with ${cdn}</title>
</head>
<body>
<div id="timer-wrapper"></div>
<p>
<button type="button" id="btnIncrement">+</button>
<input type="text" id="txtCount"/>
<button type="button" id="btnDecrement">-</button>
</p>
  <footer>RxJS bootstrapped with unpack using ${cdn}</footer>
  <script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  ${generateImportMap(framework, cdn)}
  </script>
  <script type="module-shim">

  import App from './App.js';
  App();

  </script>
</body>
</html>
    `;

  return markup;
};
