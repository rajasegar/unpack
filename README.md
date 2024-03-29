# unpack

![Build and Deploy](https://github.com/rajasegar/unpack/workflows/Build%20and%20Deploy/badge.svg)
[![npm version](http://img.shields.io/npm/v/@rajasegar/unpack.svg?style=flat)](https://npmjs.org/package/@rajasegar/unpack "View this project on npm")
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)



:rocket: Create web apps without a bundler :package:. 

unpack is a web app scaffolding tool which generates a project boilerplate with no `npm` dependencies, to develop and build apps within the browser
without any build tooling.

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
unpack new <project-name> --template React --cdn skypack
```
or 
```
unpack new my-preact-app -t Preact --cdn skypack
```

The `--template` option can have the following values:
- React
- Preact
- Vue
- Vue3
- lit-element
- hyperapp
- RxJS
- Cycle

The `--cdn` option can have the following values:
- jspm
- skypack
- unpkg
- esm
- jsdelivr
- esm.run


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


## Support Matrix
| Framework/CDN | Skypack            | jspm               | unpkg              | esm.sh             | jsdelivr           | esm.run            |
|---------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|
| React         | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x:                |
| Preact        | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Vue           | :x:                | :heavy_check_mark: | :x:                | :x:                | :x:                | :x:                |
| Vue 3         | :heavy_check_mark: | :heavy_check_mark: | :x:                | :x:                | :x:                | :x:                |
| lit-element   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x:                |
| hyperapp      | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x:                | :heavy_check_mark: | :heavy_check_mark: |
| Cycle.js      | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                | :x:                |
| RxJS          | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x:                | :x:                |

Edited the above Markdown table with [tablesgenerator.com](https://www.tablesgenerator.com/markdown_tables)

## CDN Support
- [Skypack](https://skypack.dev)
- [jspm](https://jspm.dev)
- [unpkg](https://unpkg.com)
- [esm.sh](https://esm.sh)
- [jsdelivr](https://cdn.jsdelivr.net)
- [esm.run](https://esm.run)

## Framework Support
- [React](https://reactjs.org)
- [Vue.js](https://vuejs.org)
- [Preact](https://preactjs.com)
- [lit-element](https://lit-element.polymer-project.org/)
- [hyperapp](https://github.com/jorgebucaran/hyperapp)
- [RxJS](https://rxjs-dev.firebaseapp.com/)
- [Cycle.js](https://cycle.js.org)


## Bundling for production
Work in progress...

## Known issues
- Vue template works only with jspm
