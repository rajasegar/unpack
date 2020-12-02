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

const generatePreactMarkup = require('../../src/generatePreactMarkup');

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
    QUnit.module('Preact', function () {
      const cdns = ['jspm', 'skypack', 'esm', 'unpkg', 'esm.run', 'jsdelivr'];
      cdns.forEach((cdn) => {
        QUnit.test(`should generate with ${cdn}`, async function (assert) {
          let result = await execa(EXECUTABLE_PATH, [
            'new',
            'my-preact-app',
            '--template',
            'Preact',
            '--cdn',
            cdn,
          ]);

          assert.equal(result.exitCode, 0, 'exited with zero');
          assert.deepEqual(walkSync(cliProject.name), [
            'my-preact-app/',
            'my-preact-app/App.js',
            'my-preact-app/index.html',
          ]);

          const actual = fs.readFileSync(
            PROJECT_ROOT + '/src/templates/Preact/App.js',
            'utf8'
          );
          const expected = fs.readFileSync(
            cliProject.name + '/my-preact-app/App.js',
            'utf8'
          );
          assert.equal(actual, expected);

          // index.html
          const input = generatePreactMarkup({
            projectName: 'my-preact-app',
            framework: 'Preact',
            cdn,
          });
          const output = fs.readFileSync(
            cliProject.name + '/my-preact-app/index.html',
            'utf8'
          );
          assert.equal(input, output);

          const app = express();
          app.use(express.static(cliProject.name + '/my-preact-app'));

          const port = await getPort();
          const server = app.listen(port, async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://localhost:' + port);
            await page.waitForSelector('#app', {
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
