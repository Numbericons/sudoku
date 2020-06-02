import React from 'react';
import Board from './Board.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  gameOver(){}
  chkBoard(){}
  play(){}
  render() {
    return <div>
      <Board></Board>
    </div>
  }
}

export default Game;