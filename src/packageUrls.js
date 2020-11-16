'use strict';

module.exports = {
  jspm: {
    React: {
      react: 'https://jspm.dev/react',
      'react-dom': 'https://jspm.dev/react-dom',
      htm: 'https://jspm.dev/htm',
    },
    Preact: {
      preact: 'https://jspm.dev/preact',
      htm: 'https://jspm.dev/htm',
    },
    Vue: {
      vue: 'https://jspm.dev/vue/dist/vue',
    },
  },
  skypack: {
    React: {
      react: 'https://cdn.skypack.dev/react?min',
      'react-dom': 'https://cdn.skypack.dev/react-dom?min',
      htm: 'https://cdn.skypack.dev/htm?min',
    },
    Preact: {
      preact: 'https://cdn.skypack.dev/preact?min',
      htm: 'https://cdn.skypack.dev/htm?min',
    },
    Vue: {
      vue: 'https://cdn.skypack.dev/vue?min',
    },
  },
  unpkg: {
    React: {
      react: 'https://unpkg.com/@esm-bundle/react/esm/react.production.min.js',
      'react-dom':
        'https://unpkg.com/@esm-bundle/react-dom/esm/react-dom.production.min.js',
      htm: 'https://unpkg.com/htm?module',
    },
    Preact: {
      preact: 'https://unpkg.com/preact?module',
      htm: 'https://unpkg.com/htm?module',
    },
    Vue: {
      vue: 'https://unpkg.com/vue?module',
    },
  },
  esm: {
    React: {
      react: 'https://esm.sh/react',
      'react-dom': 'https://esm.sh/react-dom',
      htm: 'https://esm.sh/htm',
    },
    Preact: {
      preact: 'https://esm.sh/preact',
      htm: 'https://esm.sh/htm',
    },
    Vue: {
      vue: 'https://esm.sh/vue',
    },
  },
  jsdelivr: {
    React: {
      react:
        'https://cdn.jsdelivr.net/npm/@esm-bundle/react/esm/react.production.min.js',
      'react-dom':
        'https://cdn.jsdelivr.net/npm/@esm-bundle/react-dom/esm/react-dom.production.min.js',
      htm: 'https://esm.sh/htm',
    },
    Preact: {
      preact: 'https://esm.sh/preact',
      htm: 'https://esm.sh/htm',
    },
    Vue: {
      vue: 'https://esm.sh/vue',
    },
  },
};
