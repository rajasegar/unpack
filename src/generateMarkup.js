'use strict';

const generateImportMap = require('./generateImportMap');
const packageUrls = require('./packageUrls');
module.exports = function(options) {

  const {
    projectName,
    importMaps,
    cdn,
    framework
  } = options;

  const generateImports = () => {
    if(cdn === 'unpkg') {
      return `
    import { React, ReactDOM } from "${ importMaps ? 'esm-react' : packageUrls[cdn][framework]['esm-react'] }";`
    } else {

      return `
    import React from "${ importMaps ? 'react' : packageUrls[cdn][framework]['react'] }";
    import ReactDOM from "${ importMaps ? 'react-dom' : packageUrls[cdn][framework]['react-dom'] }";
      `;
    }
  }

    const markup = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName}</title>
</head>
<body>
  <div id="app"></app>
  ${ importMaps ? 
  `<script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  ${generateImportMap(framework,cdn)}
  </script>` : '' }
  <script type="${ importMaps ? 'module-shim' : 'module' }">

  ${generateImports()}

    import htm from "${ importMaps ? 'htm' : packageUrls[cdn][framework]['htm']}";

    const html = htm.bind(React.createElement);
    const App = () => html\`<h1>Hello ${framework} from ${cdn}</h1>\`;

    ReactDOM.render(html\`<\$\{App\}/>\`, document.getElementById('app'));
  </script>
</body>
</html>
    `;

  return markup;
};
