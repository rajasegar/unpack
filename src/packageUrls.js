'use strict';

module.exports = {
  'jspm': {
    'React' : {
      'react': 'https://jspm.dev/react',
      'react-dom': 'https://jspm.dev/react-dom',
      'htm': 'https://jspm.dev/htm',
    },
    'Preact' : {
      'preact': 'https://jspm.dev/preact',
      'htm': 'https://jspm.dev/htm',
    }
  },
  'skypack': {
    'React' : {
      'react': 'https://cdn.skypack.dev/react?min',
      'react-dom': 'https://cdn.skypack.dev/react-dom?min',
      'htm': 'https://cdn.skypack.dev/htm?min',
    },
    'Preact' : {
      'preact': 'https://cdn.skypack.dev/preact?min',
      'htm': 'https://cdn.skypack.dev/htm?min',
    }
  },
  'unpkg': {
    'React' : {
      'esm-react': 'https://unpkg.com/esm-react',
      'htm': 'https://unpkg.com/htm?module',
    },
    'Preact' : {
      'preact': 'https://unpkg.com/preact?module',
      'htm': 'https://unpkg.com/htm?module',
    }
  }
};


