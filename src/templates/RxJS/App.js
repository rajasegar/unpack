import { fromEvent, merge, interval } from 'rxjs';
import { scan, map, startWith } from 'rxjs/operators';

export default function App() {
  const btnIncrement = document.getElementById('btnIncrement');
  const btnDecrement = document.getElementById('btnDecrement');
  const txt = document.getElementById('txtCount');
  const increment$ = fromEvent(btnIncrement, 'click').pipe(map((ev) => +1));
  const decrement$ = fromEvent(btnDecrement, 'click').pipe(map((ev) => -1));

  merge(increment$, decrement$)
    .pipe(scan((inc, dec) => inc + dec, 0))
    .subscribe((count) => (txt.value = count));

  const span = document.createElement('span');
  span.setAttribute('id', 'timer');
  document.querySelector('#timer-wrapper').appendChild(span);
  interval(1000).subscribe((x) => {
    span.textContent = `${x} seconds elapsed.`;
  });
}
