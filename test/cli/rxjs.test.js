/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');
const walkSync = require('walk-sync');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '../..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

const generateRxJSMarkup = require('../../src/generateRxJSMarkup');

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
    QUnit.module('RxJS', function () {
      const cdns = ['jspm', 'skypack', 'esm', 'unpkg', 'esm.run', 'jsdelivr'];
      cdns.forEach((cdn) => {
        QUnit.test(`should generate with ${cdn}`, async function (assert) {
          let result = await execa(EXECUTABLE_PATH, [
            'new',
            'my-rxjs-app',
            '--template',
            'RxJS',
            '--cdn',
            cdn,
          ]);

          assert.equal(result.exitCode, 0, 'exited with zero');
          assert.deepEqual(walkSync(cliProject.name), [
            'my-rxjs-app/',
            'my-rxjs-app/App.js',
            'my-rxjs-app/index.html',
          ]);

          const actual = fs.readFileSync(
            PROJECT_ROOT + '/src/templates/RxJS/App.js',
            'utf8'
          );
          const expected = fs.readFileSync(
            cliProject.name + '/my-rxjs-app/App.js',
            'utf8'
          );
          assert.equal(actual, expected);

          // index.html
          const input = generateRxJSMarkup({
            projectName: 'my-rxjs-app',
            framework: 'RxJS',
            cdn,
          });
          const output = fs.readFileSync(
            cliProject.name + '/my-rxjs-app/index.html',
            'utf8'
          );
          assert.equal(input, output);
        });
      });
    });
  });
});
