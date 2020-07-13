import React from 'react';
import Board from './Board.jsx';
// import logo from './logo.svg';
import './stylesheets/input.scss';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.loads = 1;
  }
  gameOver(){}
  chkBoard(){}
  play(){}

  render() {
    let val;
    if (this.loads === 1) val = prompt("Choose difficulty between 1 to 100 larger numbers are harder:");
    debugger;
    this.loads += 1;
    // debugger
    // if (this.firstLoad) {
    //   this.firstLoad = false;
    //   return null;
    // }
    return <div className='main'>
      <div className='main-head'>
        <h1 className='main-head-text'>Sudoku</h1>
      </div>
      <div className='main-body'>
        <div></div>
        <Board loads={this.loads} val={val}></Board>
        <div></div>
      </div>
      <div className="hide">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  }
}

export default Game;