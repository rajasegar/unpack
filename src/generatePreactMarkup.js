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
      return `
    import { h, Component, render }  from "${ importMaps ? 'preact' : packageUrls[cdn][framework]['preact'] }";
      `;
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
  ${ importMaps ? 
  `<script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  ${generateImportMap(framework,cdn)}
  </script>` : '' }
  <script type="${ importMaps ? 'module-shim' : 'module' }">

  ${generateImports()}

    import htm from "${ importMaps ? 'htm' : packageUrls[cdn][framework]['htm']}";

    const html = htm.bind(h);
    const App = html\`<h1>Hello ${framework} from ${cdn}</h1>\`;

    render(App, document.getElementById('app'));
  </script>
</body>
</html>
    `;

  return markup;
};
