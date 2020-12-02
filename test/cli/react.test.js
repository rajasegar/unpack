/* globals QUnit */
const path = require('path');
const tmp = require('tmp');
const execa = require('execa');
const walkSync = require('walk-sync');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '../..');
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, 'bin', 'cli.js');
const ROOT = process.cwd();

const generateReactMarkup = require('../../src/generateReactMarkup');

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
    QUnit.module('React', function () {
      QUnit.test('should generate with jspm', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-react-app',
          '--template',
          'React',
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-react-app/',
          'my-react-app/App.js',
          'my-react-app/index.html',
        ]);

        const actual = fs.readFileSync(
          PROJECT_ROOT + '/src/templates/React/App.js',
          'utf8'
        );
        const expected = fs.readFileSync(
          cliProject.name + '/my-react-app/App.js',
          'utf8'
        );
        assert.equal(actual, expected);

        // index.html
        const input = generateReactMarkup({
          projectName: 'my-react-app',
          framework: 'React',
          cdn: 'jspm',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-react-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with skypack', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-react-app',
          '--template',
          'React',
          '--cdn',
          'skypack',
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-react-app/',
          'my-react-app/App.js',
          'my-react-app/index.html',
        ]);

        const actual = fs.readFileSync(
          PROJECT_ROOT + '/src/templates/React/App.js',
          'utf8'
        );
        const expected = fs.readFileSync(
          cliProject.name + '/my-react-app/App.js',
          'utf8'
        );
        assert.equal(actual, expected);

        // index.html
        const input = generateReactMarkup({
          projectName: 'my-react-app',
          framework: 'React',
          cdn: 'skypack',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-react-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with unpkg', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-react-app',
          '--template',
          'React',
          '--cdn',
          'unpkg',
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-react-app/',
          'my-react-app/App.js',
          'my-react-app/index.html',
        ]);

        const actual = fs.readFileSync(
          PROJECT_ROOT + '/src/templates/React/App.js',
          'utf8'
        );
        const expected = fs.readFileSync(
          cliProject.name + '/my-react-app/App.js',
          'utf8'
        );
        assert.equal(actual, expected);

        // index.html
        const input = generateReactMarkup({
          projectName: 'my-react-app',
          framework: 'React',
          cdn: 'unpkg',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-react-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with jsdelivr', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-react-app',
          '--template',
          'React',
          '--cdn',
          'jsdelivr',
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-react-app/',
          'my-react-app/App.js',
          'my-react-app/index.html',
        ]);

        const actual = fs.readFileSync(
          PROJECT_ROOT + '/src/templates/React/App.js',
          'utf8'
        );
        const expected = fs.readFileSync(
          cliProject.name + '/my-react-app/App.js',
          'utf8'
        );
        assert.equal(actual, expected);

        // index.html
        const input = generateReactMarkup({
          projectName: 'my-react-app',
          framework: 'React',
          cdn: 'jsdelivr',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-react-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });

      QUnit.test('should generate with esm.sh', async function (assert) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-react-app',
          '--template',
          'React',
          '--cdn',
          'esm',
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-react-app/',
          'my-react-app/App.js',
          'my-react-app/index.html',
        ]);

        const actual = fs.readFileSync(
          PROJECT_ROOT + '/src/templates/React/App.js',
          'utf8'
        );
        const expected = fs.readFileSync(
          cliProject.name + '/my-react-app/App.js',
          'utf8'
        );
        assert.equal(actual, expected);

        // index.html
        const input = generateReactMarkup({
          projectName: 'my-react-app',
          framework: 'React',
          cdn: 'esm',
        });
        const output = fs.readFileSync(
          cliProject.name + '/my-react-app/index.html',
          'utf8'
        );
        assert.equal(input, output);
      });
    });
  });
});
