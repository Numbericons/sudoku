import React from 'react';
import Board from './Board.jsx';
import EntryForm from './EntryForm.jsx';
import './stylesheets/input.scss';
import Timer from 'react-compound-timer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.loads = 1;
    this.state = { difficulty: null };

    this.setDifficulty = this.setDifficulty.bind(this);
  }
  
  gameOver(){}
  chkBoard(){}
  play(){}

  setDifficulty(e, difficulty) {
    this.setState({ difficulty: difficulty });
  }

  render() {
    // let val;
    // if (this.loads === 1) val = prompt("Choose a difficulty between 1 and 100 inlusive to set the percentage of squares you want hidden:","50");
    if (!this.state.difficulty) {
      return <div>
        <EntryForm setDifficulty={this.setDifficulty}></EntryForm>
      </div>
    }
    return <div className='main' style={{backgroundImage: "url(backgroundImg.png)"}} >
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
        <Board val={parseInt(this.state.difficulty)}></Board>
        <div></div>
      </div>
      <div className="hide">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  }
}

export default Game;