/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');
const walkSync = require('walk-sync');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

const generateLitElementMarkup = require('../src/generateLitElementMarkup');

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
      QUnit.test('should generate with jspm', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-lit-element-app',
          '--template',
          'lit-element',
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
          cdn: 'jspm',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-lit-element-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with skypack', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-lit-element-app',
          '--template',
          'lit-element',
          '--cdn',
          'skypack',
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
          cdn: 'skypack',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-lit-element-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with unpkg', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-lit-element-app',
          '--template',
          'lit-element',
          '--cdn',
          'unpkg',
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
          cdn: 'unpkg',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-lit-element-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with jsdelivr', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-lit-element-app',
          '--template',
          'lit-element',
          '--cdn',
          'jsdelivr',
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
          cdn: 'jsdelivr',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-lit-element-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with esm.sh', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-lit-element-app',
          '--template',
          'lit-element',
          '--cdn',
          'esm',
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
          cdn: 'esm',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-lit-element-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });
    });
  });
});
