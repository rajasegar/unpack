/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');
const walkSync = require('walk-sync');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '../..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

const generateVue3Markup = require('../../src/generateVue3Markup');

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
    QUnit.module('Vue3', function () {
      QUnit.test('should generate with jspm', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-vue-app',
          '--template',
          'Vue3',
          '--cdn',
          'jspm',
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-vue-app/',
          'my-vue-app/App.js',
          'my-vue-app/index.html',
        ]);

        const actual = fs.readFileSync(
          PROJECT_ROOT + '/src/templates/Vue3/App.js',
          'utf8'
        );
        const expected = fs.readFileSync(
          cliProject.name + '/my-vue-app/App.js',
          'utf8'
        );
        assert.equal(actual, expected);

        // index.html
        const input = generateVue3Markup({
          projectName: 'my-vue-app',
          framework: 'Vue3',
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
