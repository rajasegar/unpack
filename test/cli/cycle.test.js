/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');
const walkSync = require('walk-sync');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '../..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

const generateCycleMarkup = require('../../src/generateCycleMarkup');

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
    QUnit.module('Cycle.js', function () {
      const cdns = ['jspm', 'esm'];
      cdns.forEach((cdn) => {
        QUnit.test(`should generate with ${cdn}`, async function (assert) {
          let result = await execa(EXECUTABLE_PATH, [
            'new',
            'my-cycle-app',
            '--template',
            'Cycle',
            '--cdn',
            cdn,
          ]);

          assert.equal(result.exitCode, 0, 'exited with zero');
          assert.deepEqual(walkSync(cliProject.name), [
            'my-cycle-app/',
            'my-cycle-app/App.js',
            'my-cycle-app/index.html',
          ]);

          const actual = fs.readFileSync(
            PROJECT_ROOT + '/src/templates/Cycle/App.js',
            'utf8'
          );
          const expected = fs.readFileSync(
            cliProject.name + '/my-cycle-app/App.js',
            'utf8'
          );
          assert.equal(actual, expected);

          // index.html
          const input = generateCycleMarkup({
            projectName: 'my-cycle-app',
            framework: 'Cycle',
            cdn,
          });
          const output = fs.readFileSync(
            cliProject.name + '/my-cycle-app/index.html',
            'utf8'
          );
          assert.equal(input, output);
        });
      });
    });
  });
});
