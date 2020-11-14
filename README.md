# unpack

:rocket: Create web apps without a bundler :package:. 

unpack is a web app scaffolding tool which generates a project boilerplate with no `npm` dependencies, to build apps within the browser.

**WARNING**: Not recommended for production workflows.

## Installation
```
npx @rajasegar/unpack
```

Using npm
```
npm i -g @rajasegar/unpack
```

Using yarn
```
yarn add --global @rajasegar/unpack
```

Using pnpm
```
pnpm add --global @rajasegar/unpack
```

## Usage
```
unpack
```
Follow the prompts to choose the Framework (React, Preact or Vue) and CDN (Skypack, jspm or unpkg).

Then switch to the newly created app directory and start a web server, something like [http-server](https://github.com/http-party/http-server) or [servor](https://github.com/lukejacksonn/servor). You are free to choose your own web-server tool, there is no lock-in unlike other bundlers.

```
cd my-react-app
servor . --reload --browse
```

You can also choose from predefined templates for a particular framework using:
```
unpack new <project-name> --template React
```
or 
```
unpack new my-vue-app -t Vue
```

## index.html (generated)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>hello</title>
</head>
<body>
  <div id="app"></app>
  <script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  {
    "imports": {
      "react": "https://cdn.skypack.dev/react?min",
      "react-dom": "https://cdn.skypack.dev/react-dom?min",
      "htm": "https://cdn.skypack.dev/htm?min"
    }
  }
  </script>
  <script type="module-shim">
  
    import React from "react";
    import ReactDOM from "react-dom";
    import htm from "htm";

    const html = htm.bind(React.createElement);
    const App = () => html`<h1>Hello React from skypack</h1>`;

    ReactDOM.render(html`<${App}/>`, document.getElementById('app'));
  </script>
</body>
</html>
```

## How does it work?
It makes use of CDN for delivering ESM compatible JS to the browser for your favorite JS libraries and frameworks so that you can make use of the module scripts to run code inside your browser. 
It also makes use of [import maps](https://github.com/wicg/import-maps) to enhance the developer experience to map the absolute package urls to user-friendly names so that you don't have to write import statements like:

```js
import React from  'https://unpkg.com/react@17/umd/react.production.min.js';
```

Instead you can simply use:
```js
import React from 'react';
```

Import maps are not yet mainstream, since not all the browsers implemented them and Chrome supports it behind a [feature flag](https://developers.chrome.com/extensions/experimental). That's why unpack includes the [es-module-shims](https://github.com/guybedford/es-module-shims) script to work with import maps.


## CDN Support
- [Skypack](https://skypack.dev)
- [jspm](https://jspm.dev)
- [unpkg](https://unpkg.com)
- [esm](https://esm.sh)

## Framework Support
- [React](https://reactjs.org)
- [Vue.js](https://vuejs.org)
- [Preact](https://preactjs.com)


## Bundling for production
Work in progress...

