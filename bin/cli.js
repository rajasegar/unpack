#!/usr/bin/env node

'use strict';
const prompts = require('prompts');
const minimist = require('minimist');
const createApp = require('../');

const argv = minimist(process.argv.slice(2));
let isTerminated = false;

if (argv._.length < 2) {
  const questions = [
    {
      type: 'text',
      name: 'projectName',
      message: 'Enter the project name:',
      validate: (value) => (!value ? `Invalid project name` : true),
    },
    {
      type: 'select',
      name: 'framework',
      message: 'Pick a framework',
      choices: [
        { title: 'React', value: 'React' },
        { title: 'Vue', value: 'Vue' },
        { title: 'Vue3', value: 'Vue3' },
        { title: 'Preact', value: 'Preact' },
        { title: 'lit-element', value: 'lit-element' },
        { title: 'hyperapp', value: 'hyperapp' },
        { title: 'Cycle.js', value: 'Cycle' },
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'cdn',
      message: 'Choose a CDN:',
      choices: [
        { title: 'skypack.dev', value: 'skypack' },
        { title: 'jspm.dev', value: 'jspm' },
        { title: 'unpkg.com', value: 'unpkg' },
        { title: 'esm.sh', value: 'esm' },
        { title: 'esm.run', value: 'esm.run' },
        { title: 'jsdelivr.net', value: 'jsdelivr' },
      ],
    },
  ];

  const onCancel = () => {
    console.log('Unpack terminated!');
    isTerminated = true; // set flag
    return false; // stop prompting
  };

  (async () => {
    const response = await prompts(questions, { onCancel });
    if (!isTerminated) {
      createApp(response);
    }
  })();
} else {
  const options = {
    projectName: argv._[1],
    framework: argv.template || argv.t,
    cdn: argv.cdn || 'jspm',
  };
  createApp(options);
}
