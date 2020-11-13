#!/usr/bin/env node

'use strict';
const prompts = require('prompts');
const createApp = require('../');

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
  {
    type: 'confirm',
    name: 'importMaps',
    message: 'Do you want to generate import map?',
    initial: true
  }
  
];
(async () => {
  const response = await prompts(questions);

  console.log(response);
  createApp(response);

})();
