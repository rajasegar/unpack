'use strict';

const fs = require('fs');
const util = require('util');

const generateReactMarkup = require('./src/generateReactMarkup');
const generatePreactMarkup = require('./src/generatePreactMarkup');
const generateVueMarkup = require('./src/generateVueMarkup');

module.exports = function(options) {
  const { projectName, framework, cdn, importMaps } = options;

  const mkdir = util.promisify(fs.mkdir);
  const writeFile = util.promisify(fs.writeFile);
  const copyFile = util.promisify(fs.copyFile);

  (async () => {
    console.log('creating project dir');
    await mkdir(projectName);

    let markup = '';
    switch(framework) {
      case 'React':
        markup = generateReactMarkup(options);
        break;

      case 'Preact':
        markup = generatePreactMarkup(options);
        break;

      case 'Vue':
        markup = generateVueMarkup(options);
        break;
    }

    console.log('creating index.html');
    await writeFile(`${projectName}/index.html`, markup, 'utf-8');

    console.log('creating App.js');
    await copyFile(__dirname + `/src/templates/${framework}/App.js` , `${projectName}/App.js`);

  })();
  

}
