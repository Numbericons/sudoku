import React from 'react';
import Board from './Board.jsx';
// import logo from './logo.svg';
import './stylesheets/input.scss';


class Game extends React.Component {
  gameOver(){}
  chkBoard(){}
  play(){}

  render() {
    return <div className='main'>
      <Board ></Board>
      <div className="hide">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  }
}

export default Game;