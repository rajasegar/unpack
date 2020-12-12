/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');

const express = require('express');
const getPort = require('get-port');
const puppeteer = require('puppeteer');

const PROJECT_ROOT = path.join(__dirname, '../..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

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

  QUnit.module('render', function () {
    QUnit.module('RxJS', function () {
      const cdns = ['jspm', 'skypack', 'esm', 'unpkg'];
      cdns.forEach((cdn) => {
        QUnit.test(`should work with ${cdn}`, async function (assert) {
          let result = await execa(EXECUTABLE_PATH, [
            'new',
            'my-rxjs-app',
            '--template',
            'RxJS',
            '--cdn',
            cdn,
          ]);

          assert.equal(result.exitCode, 0, 'exited with zero');

          const app = express();
          app.use(express.static(cliProject.name + '/my-rxjs-app'));

          const port = await getPort();
          const server = app.listen(port, async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://localhost:' + port);
            await page.waitForSelector('#timer', {
              visible: true,
            });
            //await page.screenshot({ path: `rxjs-${cdn}.png` });
            await browser.close();
            server.close(function () {});
          });
        });
      });
    });
  });
});
