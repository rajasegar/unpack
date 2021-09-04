'use strict';

const generateImportMap = require('./generateImportMap');
module.exports = function (options) {
  const { projectName, cdn, framework } = options;

  const markup = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName} - Cycle.js with ${cdn}</title>
</head>
<body>
  <div id="app"></app>
  <footer>Cycle.js bootstrapped with unpack using ${cdn}</footer>
  <script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  ${generateImportMap(framework, cdn)}
  </script>
  <script type="module-shim">
  import { run } from '@cycle/run';
  import { makeDOMDriver } from '@cycle/dom';

  import main from './App.js';

  run(main, {
    DOM: makeDOMDriver('#app')
  });
  </script>
</body>
</html>
    `;

  return markup;
};
