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
const generateReactMarkup = require('../src/generateReactMarkup');
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
    QUnit.module('React', function() {
      QUnit.test('should generate with jspm', async function (
        assert
      ) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-react-app',
          '--template',
          'React'
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-react-app/',
          'my-react-app/App.js',
          'my-react-app/index.html',
        ]);

        const actual = fs.readFileSync(PROJECT_ROOT + '/src/templates/React/App.js', 'utf8');
        const expected = fs.readFileSync(cliProject.name + '/my-react-app/App.js', 'utf8');
        assert.equal(actual, expected);

        // index.html
        const input = generateReactMarkup({ projectName: 'my-react-app', framework: 'React', cdn: 'jspm' });
        const output = fs.readFileSync(cliProject.name + '/my-react-app/index.html', 'utf8');
        assert.equal(input, output);
      });

      QUnit.test('should generate with skypack', async function (
        assert
      ) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-react-app',
          '--template',
          'React',
          '--cdn',
          'skypack'
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-react-app/',
          'my-react-app/App.js',
          'my-react-app/index.html',
        ]);

        const actual = fs.readFileSync(PROJECT_ROOT + '/src/templates/React/App.js', 'utf8');
        const expected = fs.readFileSync(cliProject.name + '/my-react-app/App.js', 'utf8');
        assert.equal(actual, expected);

        // index.html
        const input = generateReactMarkup({ projectName: 'my-react-app', framework: 'React', cdn: 'skypack' });
        const output = fs.readFileSync(cliProject.name + '/my-react-app/index.html', 'utf8');
        assert.equal(input, output);
      });


      QUnit.test('should generate with unpkg', async function (
        assert
      ) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-react-app',
          '--template',
          'React',
          '--cdn',
          'unpkg'
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-react-app/',
          'my-react-app/App.js',
          'my-react-app/index.html',
        ]);

        const actual = fs.readFileSync(PROJECT_ROOT + '/src/templates/React/App.js', 'utf8');
        const expected = fs.readFileSync(cliProject.name + '/my-react-app/App.js', 'utf8');
        assert.equal(actual, expected);

        // index.html
        const input = generateReactMarkup({ projectName: 'my-react-app', framework: 'React', cdn: 'unpkg' });
        const output = fs.readFileSync(cliProject.name + '/my-react-app/index.html', 'utf8');
        assert.equal(input, output);
      });
    });

    QUnit.module('Vue', function() {
    QUnit.test('should generate with jspm', async function (
      assert
    ) {
      let result = await execa(EXECUTABLE_PATH, [
        'new',
        'my-vue-app',
        '--template',
        'Vue'
      ]);

      assert.equal(result.exitCode, 0, 'exited with zero');
      assert.deepEqual(walkSync(cliProject.name), [
        'my-vue-app/',
        'my-vue-app/App.js',
        'my-vue-app/index.html',
      ]);

      const actual = fs.readFileSync(PROJECT_ROOT + '/src/templates/Vue/App.js', 'utf8');
      const expected = fs.readFileSync(cliProject.name + '/my-vue-app/App.js', 'utf8');
      assert.equal(actual, expected);

      // index.html
      const input = generateVueMarkup({ projectName: 'my-vue-app', framework: 'Vue', cdn: 'jspm' });
      const output = fs.readFileSync(cliProject.name + '/my-vue-app/index.html', 'utf8');
      assert.equal(input, output);
    });
    });


    QUnit.module('Preact', function() {
      QUnit.test('should generate with jspm', async function (
        assert
      ) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-preact-app',
          '--template',
          'Preact'
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-preact-app/',
          'my-preact-app/App.js',
          'my-preact-app/index.html',
        ]);

        const actual = fs.readFileSync(PROJECT_ROOT + '/src/templates/Preact/App.js', 'utf8');
        const expected = fs.readFileSync(cliProject.name + '/my-preact-app/App.js', 'utf8');
        assert.equal(actual, expected);

        // index.html
        const input = generatePreactMarkup({ projectName: 'my-preact-app', framework: 'Preact', cdn: 'jspm' });
        const output = fs.readFileSync(cliProject.name + '/my-preact-app/index.html', 'utf8');
        assert.equal(input, output);
      });

      QUnit.test('should generate with skypack', async function (
        assert
      ) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-preact-app',
          '--template',
          'Preact',
          '--cdn',
          'skypack'
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-preact-app/',
          'my-preact-app/App.js',
          'my-preact-app/index.html',
        ]);

        const actual = fs.readFileSync(PROJECT_ROOT + '/src/templates/Preact/App.js', 'utf8');
        const expected = fs.readFileSync(cliProject.name + '/my-preact-app/App.js', 'utf8');
        assert.equal(actual, expected);

        // index.html
        const input = generatePreactMarkup({ projectName: 'my-preact-app', framework: 'Preact', cdn: 'skypack' });
        const output = fs.readFileSync(cliProject.name + '/my-preact-app/index.html', 'utf8');
        assert.equal(input, output);
      });

      QUnit.test('should generate with unpkg', async function (
        assert
      ) {
        let result = await execa(EXECUTABLE_PATH, [
          'new',
          'my-preact-app',
          '--template',
          'Preact',
          '--cdn',
          'unpkg'
        ]);

        assert.equal(result.exitCode, 0, 'exited with zero');
        assert.deepEqual(walkSync(cliProject.name), [
          'my-preact-app/',
          'my-preact-app/App.js',
          'my-preact-app/index.html',
        ]);

        const actual = fs.readFileSync(PROJECT_ROOT + '/src/templates/Preact/App.js', 'utf8');
        const expected = fs.readFileSync(cliProject.name + '/my-preact-app/App.js', 'utf8');
        assert.equal(actual, expected);

        // index.html
        const input = generatePreactMarkup({ projectName: 'my-preact-app', framework: 'Preact', cdn: 'unpkg' });
        const output = fs.readFileSync(cliProject.name + '/my-preact-app/index.html', 'utf8');
        assert.equal(input, output);
      });
    });
  });
});
