'use strict';

const generateImportMap = require('./generateImportMap');
module.exports = function (options) {
  const { projectName, cdn, framework } = options;

  const generateImports = () => {
    if (cdn === 'unpkg') {
      return `import { React, ReactDOM } from "esm-react";`;
    } else {
      return `
    import React from "react";
    import ReactDOM from "react-dom";
      `;
    }
  };

  const markup = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName}</title>
</head>
<body>
  <div id="app"></app>
  <script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  ${generateImportMap(framework, cdn)}
  </script>
  <script type="module-shim">
  ${generateImports()}
    import htm from "htm";
    import App from './App.js';

    const html = htm.bind(React.createElement);

    ReactDOM.render(html\`<\$\{App\} cdn=${cdn}/>\`, document.getElementById('app'));
  </script>
</body>
</html>
    `;

  return markup;
};
