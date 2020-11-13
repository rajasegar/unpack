# unpack

Create web apps without a bundler. 

unpack is a web app scaffolding tool which generates a project boilerplate with no `npm` dependencies, to build apps within the browser.


## Installation
Using npm
```
npm i -g @rajasegar/unpack
```

## Usage
```
unpack
```

## How does it work?
It makes use of CDN for deliverying ESM compatible JS to the browser for your favorite JS libraries and frameworks so that you can make use of the module scripts to run code inside your browser. It also makes use of `import maps` to enhance the developer experience to map the absolute package urls to user-friendly names so that you don't have to write import statements like:

```js
import React from  'https://unpkg.com/react@17/umd/react.production.min.js';
```

Instead you can simply use:
```js
import React from 'react';
```

Import maps are optional, you don't have to use it necessarily.


## CDN Support
- [Skypack](https://skypack.dev)
- [jspm](https://jspm.dev)
- [unpkg](https://unpkg.com)


## Bundling for production
Work in progress...

