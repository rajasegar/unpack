import { h } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export default function App(props) {
  return html`<h1>Hello Preact from ${props.cdn}</h1>`;
}
