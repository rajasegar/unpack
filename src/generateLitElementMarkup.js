'use strict';

const generateImportMap = require('./generateImportMap');
module.exports = function (options) {
  const { projectName, cdn, framework } = options;

  const markup = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName} - lit-element with ${cdn}</title>
</head>
<body>
  <my-element></my-element>
  <script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  ${generateImportMap(framework, cdn)}
  </script>
  <script type="module-shim">

  import MyElement from './App.js';

  window.customElements.define('my-element', MyElement);
  </script>
</body>
</html>
    `;

  return markup;
};
