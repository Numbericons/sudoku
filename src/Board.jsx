import React from 'react';
import Square from './Square.jsx';
import Number from './Number.jsx';
import {buildBoard} from './boardBuilder.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      grid: this.getBoard()
    }
    this.won = false;
    this.select = this.select.bind(this);
    this.changeVal = this.changeVal.bind(this);
  }

  changeVal(e,idx) {
    let newGrid = JSON.parse(JSON.stringify(this.state.grid));
    newGrid[idx][2] = this.state.selected === 'eraser' ? "" : this.state.selected;
    this.setState({grid: newGrid});
  }

  getBoard(len = 3) {
    let grid = buildBoard(len, this.props.val);
    while (grid.length < 81) grid = buildBoard(len, this.props.val);

    return grid;
  }

  row(idx) {
    let squares = [];

    for (let i=0;i<3;i++) {
      let square = <Square key={idx + i} idx={idx + i} attr={this.state.grid[idx + i]} 
                           selected={this.state.selected} change={this.changeVal}></Square>;

      squares.push(square);
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
    let val = e.target.innerHTML ? parseInt(e.target.innerHTML) : 'eraser';
    this.setState({ selected: val})
  }

  numbers() {
    let numbers = [];

    for (let z=1;z<10;z++) {
      let selected = this.state.selected === z;
      numbers.push(<Number key={z} value={z} select={this.select} selected={selected}></Number>);
    }

    numbers.push(<Number key='eraser' value={<i className="fa fa-eraser"></i>} select={this.select} 
                           selected={this.state.selected === 'eraser'}>
                 </ Number>);

    numbers.push(<Number key='refresh' value={<i className="fa fa-refresh"></i>} refresh={true}></ Number>);

    return <div className='numb-cont'>{numbers}</div>
  }

  // win() {
  //   for (let z=0;z<this.state.grid.length;z++) {
  //     let arr = this.state.grid[z];
  //     if (!arr[1] && arr[0] !== arr[2]) return false;
  //   }
  //   return true;
  // }

  win() {
    let numbers;
    for (let z=0;z<this.state.grid.length;z++) {
      if (z % 9 === 0) numbers = [1,2,3,4,5,6,7,8,9];

      const arr = this.state.grid[z];
      const num = arr[1] ? arr[0] : arr[2];
      const idx = numbers.indexOf(num);
      
      if (idx === -1) return false;
      numbers.splice(idx,1);
    }
    return true;
  }

  componentDidUpdate() {
    if (!this.won && this.win()) {
      this.won = true;
      alert('You have won!');
    }
  }

  render() {
    return <div className='board'>
      {this.build()}
      {this.numbers()}
    </div>
  }
}

export default Board;