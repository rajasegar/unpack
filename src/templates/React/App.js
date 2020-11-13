import React from 'react';
import htm from 'htm';
const html = htm.bind(React.createElement);

export default function App(props) {
  return html`<h1>Hello React from ${props.cdn}</h1>`;
}
