import React from 'react';
import Board from './Board.jsx';
import './stylesheets/input.scss';
import Timer from 'react-compound-timer';

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
    if (this.loads === 1) val = prompt("Choose a difficulty between 1 to 100 indicating the percentage of squares you want hidden:","50");
    this.loads += 1;
    return <div className='main'>
      <div className='main-head'>
        <h1 className='main-head-text'>Sudoku</h1>
        <div className='timer'>
          <Timer formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}>
            <Timer.Hours formatValue={value => value === 0 ? '00:' : `${(value < 10 ? `0${value}` : value)}:`} />
            <Timer.Minutes formatValue={value => value === 0 ? '00:' : `${(value < 10 ? `0${value}` : value)}:`}/>
            <Timer.Seconds formatValue={value => value === 0 ? '00' : `${(value < 10 ? `0${value}` : value)}`}/>
          </Timer>
        </div>
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