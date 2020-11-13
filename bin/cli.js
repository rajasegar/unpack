#!/usr/bin/env node

'use strict';
const prompts = require('prompts');
const minimist = require('minimist');
const createApp = require('../');

const argv = minimist(process.argv.slice(2));

if(argv._.length < 2) {

  const questions = [
    {
      type: 'text',
      name: 'projectName',
      message: 'Enter the project name:',
    },
    {
      type: 'select',
      name: 'framework',
      message: 'Pick a framework',
      choices: [
        { title: 'React', description: 'React.js from Facebook', value: 'React' },
        { title: 'Vue', value: 'Vue'},
        { title: 'Preact', value: 'Preact' }
      ],
      initial: 0
    },
    {
      type: 'select',
      name: 'cdn',
      message: 'Choose a CDN:',
      choices: [
        { title: 'skypack.dev', value: 'skypack' },
        { title: 'jspm.dev', value: 'jspm' },
        { title: 'unpkg.com', value: 'unpkg' },
        { title: 'jsdeliver.net', value: 'jsdeliver' },
      ]
    },
  ];
  (async () => {
    const response = await prompts(questions);
    createApp(response);
  })();

} else {

  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const options = {
    projectName: argv._[1],
    framework: argv.template || argv.t,
    cdn: 'jspm'
  }
  createApp(options);
}
