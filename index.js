'use strict';

const fs = require('fs');
const util = require('util');

const generateMarkup = require('./src/generateMarkup');
const generatePreactMarkup = require('./src/generatePreactMarkup');
const generateVueMarkup = require('./src/generateVueMarkup');

module.exports = function(options) {
  const { projectName, framework, cdn, importMaps } = options;

  const mkdir = util.promisify(fs.mkdir);
  const writeFile = util.promisify(fs.writeFile);

  (async () => {
    console.log('creating project dir');
    await mkdir(projectName);

    let markup = '';
    switch(framework) {
      case 'React':
        markup = generateMarkup(options);
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

  })();
  

}
