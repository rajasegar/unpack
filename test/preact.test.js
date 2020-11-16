/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');
const walkSync = require('walk-sync');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

const generatePreactMarkup = require('../src/generatePreactMarkup');

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
      QUnit.test('should generate with jspm', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-preact-app',
          '--template',
          'Preact',
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
          cdn: 'jspm',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-preact-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with skypack', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-preact-app',
          '--template',
          'Preact',
          '--cdn',
          'skypack',
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
          cdn: 'skypack',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-preact-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with unpkg', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-preact-app',
          '--template',
          'Preact',
          '--cdn',
          'unpkg',
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
          cdn: 'unpkg',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-preact-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with jsdelivr', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-preact-app',
          '--template',
          'Preact',
          '--cdn',
          'jsdelivr',
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
          cdn: 'jsdelivr',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-preact-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with esm.sh', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-preact-app',
          '--template',
          'Preact',
          '--cdn',
          'esm',
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
          cdn: 'esm',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-preact-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });
    });
  });
});
