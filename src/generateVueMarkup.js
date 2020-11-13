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
    import Vue  from "${ importMaps ? 'vue' : packageUrls[cdn][framework]['vue'] }";
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
const App = {
  template: \`
    <div>
     <h1>Hello ${framework} from ${cdn}</h1>
     <p>{{ message }}</p>
    </div>
  \`,
  data() {
    return {
      message: 'Oh hi from the component'
    }
  }
};

new Vue({
  el: '#app',
  components: {
    App
  },
  template: \`<App/>\`
});
      </script>
</body>
</html>
    `;

  return markup;
};
