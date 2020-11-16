/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');
const walkSync = require('walk-sync');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

const generateVueMarkup = require('../src/generateVueMarkup');

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
    QUnit.module('Vue', function () {
      QUnit.test('should generate with jspm', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-vue-app',
          '--template',
          'Vue',
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-vue-app/',
          'my-vue-app/App.js',
          'my-vue-app/index.html',
        ]);

        const actual = fs.readFileSync(
          PROJECT_ROOT + '/src/templates/Vue/App.js',
          'utf8'
        );
        const expected = fs.readFileSync(
          cliProject.name + '/my-vue-app/App.js',
          'utf8'
        );
        assert.equal(actual, expected);

        // index.html
        const input = generateVueMarkup({
          projectName: 'my-vue-app',
          framework: 'Vue',
          cdn: 'jspm',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-vue-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });
    });
  });
});
