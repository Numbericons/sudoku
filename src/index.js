import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

{/* <a href="https://www.flaticon.com/free-icons/shrink" title="shrink icons">Shrink icons created by Anas Mannaa - Flaticon</a> */}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();