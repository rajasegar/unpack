'use strict';

const fs = require('fs');
const util = require('util');
const generateMarkup = require('./src/generateMarkup');
module.exports = function(options) {
  const { projectName, framework, cdn, importMaps } = options;

  const mkdir = util.promisify(fs.mkdir);
  const writeFile = util.promisify(fs.writeFile);


  (async () => {
    console.log('creating project dir');
    await mkdir(projectName);

    const markup = generateMarkup(options);

    console.log('creating index.html');
    await writeFile(`${projectName}/index.html`, markup, 'utf-8');

  })();
  

}
