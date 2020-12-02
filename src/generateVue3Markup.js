'use strict';

const generateImportMap = require('./generateImportMap');
module.exports = function (options) {
  const { projectName, cdn, framework } = options;

  const markup = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName} - Vue3 with ${cdn}</title>
</head>
<body>
  <div id="app"></app>
  <script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  ${generateImportMap(framework, cdn)}
  </script>
  <script type="module-shim">
    import Vue  from "vue";
    import App from './App.js';

    Vue.createApp(App).mount('#app');

  </script>
</body>
</html>
    `;

  return markup;
};
