import React from 'react';
import Game from './Game.jsx';
import logo from './logo.svg';
import './stylesheets/input.scss';

function Logo() {
  let logos = [];
  for (let z = 0; z < 3; z++) {
    logos.push(<img src={logo} className="App-logo" alt="logo" />)
  }
  return (
    <div>
      {logos}
    </div>
  )
}

function App() {
  let logos = Logo();

  return (
    <div className="App">
      <Game />
        {logos}
        {logos}
        {logos}
        <div className="hide">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default App;
