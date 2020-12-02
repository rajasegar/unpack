/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');
const walkSync = require('walk-sync');
const fs = require('fs');

const express = require('express');
const getPort = require('get-port');
const puppeteer = require('puppeteer');

const PROJECT_ROOT = path.join(__dirname, '../..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

const generateLitElementMarkup = require('../../src/generateLitElementMarkup');

QUnit.module('unpack', function (hooks) {
  let cliProject;

  hooks.beforeEach(function () {
    cliProject = tmp.dirSync();
    process.chdir(cliProject.name);
  });

  hooks.afterEach(function () {
    process.chdir(ROOT);
    tmp.setGracefulCleanup();
  });

  QUnit.module('new', function () {
    QUnit.module('lit-element', function () {
      const cdns = ['jspm', 'skypack', 'unpkg', 'esm.run', 'jsdelivr'];

      cdns.forEach((cdn) => {
        QUnit.test(`should generate with ${cdn}`, async function (assert) {
          let result = await execa(EXECUTABLE_PATH, [
            'new',
            'my-lit-element-app',
            '--template',
            'lit-element',
            '--cdn',
            cdn,
          ]);

          assert.equal(result.exitCode, 0, 'exited with zero');
          assert.deepEqual(walkSync(cliProject.name), [
            'my-lit-element-app/',
            'my-lit-element-app/App.js',
            'my-lit-element-app/index.html',
          ]);

          const actual = fs.readFileSync(
            PROJECT_ROOT + '/src/templates/lit-element/App.js',
            'utf8'
          );
          const expected = fs.readFileSync(
            cliProject.name + '/my-lit-element-app/App.js',
            'utf8'
          );
          assert.equal(actual, expected);

          // index.html
          const input = generateLitElementMarkup({
            projectName: 'my-lit-element-app',
            framework: 'lit-element',
            cdn,
          });
          const output = fs.readFileSync(
            cliProject.name + '/my-lit-element-app/index.html',
            'utf8'
          );
          assert.equal(input, output);

          const app = express();
          app.use(express.static(cliProject.name + '/my-lit-element-app'));

          const port = await getPort();
          const server = app.listen(port, async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://localhost:' + port);
            await page.waitForSelector('my-element', {
              visible: true,
            });
            await browser.close();
            server.close(function () {});
          });
        });
      });
    });
  });
});
