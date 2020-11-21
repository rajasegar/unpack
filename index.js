'use strict';

const fs = require('fs');
const util = require('util');

const generateReactMarkup = require('./src/generateReactMarkup');
const generatePreactMarkup = require('./src/generatePreactMarkup');
const generateVueMarkup = require('./src/generateVueMarkup');
const generateVue3Markup = require('./src/generateVue3Markup');
const generateLitElementMarkup = require('./src/generateLitElementMarkup');

module.exports = function (options) {
  const { projectName, framework } = options;

  const mkdir = util.promisify(fs.mkdir);
  const writeFile = util.promisify(fs.writeFile);
  const copyFile = util.promisify(fs.copyFile); // eslint-disable-line

  (async () => {
    console.log('creating project dir');
    await mkdir(projectName);
    try {
      let markup = '';
      switch (framework) {
        case 'React':
          markup = generateReactMarkup(options);
          break;

        case 'Preact':
          markup = generatePreactMarkup(options);
          break;

        case 'Vue':
          markup = generateVueMarkup(options);
          break;

        case 'Vue3':
          markup = generateVue3Markup(options);
          break;

        case 'lit-element':
          markup = generateLitElementMarkup(options);
          break;
      }

      console.log('creating index.html');
      await writeFile(`${projectName}/index.html`, markup, 'utf-8');

      console.log('creating App.js');
      await copyFile(
        __dirname + `/src/templates/${framework}/App.js`,
        `${projectName}/App.js`
      );
    } catch (e) {
      console.error(e);
      if (fs.existsSync(projectName)) {
        fs.rmdirSync(projectName);
      }
    }
  })();
};
