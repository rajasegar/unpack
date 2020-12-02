'use strict';

const generateImportMap = require('./generateImportMap');
module.exports = function (options) {
  const { projectName, cdn, framework } = options;

  const markup = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${projectName} - hyperapp with ${cdn}</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="https://jspm.dev/es-module-shims"></script>
  <script type="importmap-shim">
  ${generateImportMap(framework, cdn)}
  </script>
  <script type="module-shim">
    import { h, text, app } from "hyperapp"

    const AddTodo = (state) => ({
      ...state,
      todos: state.todos.concat(state.value),
    })

    const NewValue = (state, event) => ({
      ...state,
      value: event.target.value,
    })

    app({
      init: { todos: [], value: "" },
      view: ({ todos, value }) =>
        h("main", {}, [
          h("h1", {}, text("Hello hyperapp from ${cdn}")),
          h("input", { type: "text", oninput: NewValue, value }),
          h("button", { onclick: AddTodo }, text("Add")),
          h("ul", {},
            todos.map((todo) => h("li", {}, text(todo)))
          ),
        ]),
      node: document.getElementById("app"),
    })
  </script>
</body>
</html>
    `;

  return markup;
};
