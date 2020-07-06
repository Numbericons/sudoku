import React from 'react';
import Square from './Square.jsx';
import Number from './Number.jsx';
import {buildBoard} from './boardBuilder.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.grid = this.getBoard();
    this.state = {
      selected: null
    }
    this.select = this.select.bind(this);
  }

  getBoard() {
    let grid = buildBoard();
    while (grid.length < 81) grid = buildBoard();

    return grid;
  }

  row(idx) {
    let squares = [];

    for (let i=0;i<3;i++) {
      squares.push(<Square key={idx+i} attr={this.grid[idx+i]} selected={this.state.selected}></Square>)
    }

    return <div className="box-row">{squares}</div>
  }

  box(idx) {
    return <div className="box">
      {this.row(idx)}
      {this.row(idx+3)}
      {this.row(idx+6)}
    </div>
  }

  boxRow(idx) {
    return <div className="grid-row-box-row">
      {this.box(idx)}
      {this.box(idx+9)}
      {this.box(idx+18)}
    </div>
  }

  build() {
    return <div className="grid">
      <div className="grid-row">
        {this.boxRow(0)}
      </div>
      <div className="grid-row">
        {this.boxRow(27)}
      </div>
      <div className="grid-row">
        {this.boxRow(54)}
      </div>
    </div>
  }

  select(e) {
    let val = parseInt(e.target.innerHTML);
    this.setState({ selected: val})
  }

  numbers() {
    let numbers = [];

    for (let z=1;z<10;z++) {
      let selected = this.state.selected === z;
      numbers.push(<Number key={z} value={z} select={this.select} selected={selected}></Number>);
    }

    return <div className='numb-cont'>{numbers}</div>
  }

  checkWin() {}

  componentDidUpdate() {
    if (this.checkWin()) alert('You have won!');
  }

  render() {
    return <div className='board'>
      {this.build()}
      {this.numbers()}
    </div>
  }
}

export default Board;