import React from 'react';
import Square from './Square.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.grid = this.makeSquares(props.len);
  }

  sample(arr) {
    const idx = Math.floor(Math.random()*arr.length);
    return arr.splice(idx,1)[0];
  }

  getRow(arr, i, j) {
    let ret = [];
    for (let x=0;x<arr.length;x++) {
      
    }
    return ret;
  }
  
  getCol(arr, i, j) {
    let ret = [];
    const start = (i - 1) * 9;
    for (let x = start; x >= 0; x-=9) { ret.push(arr[x][0]) };
    return ret;
  }

  checkRow(num, arr, i, j) {
    return !this.getRow(arr, i, j).includes(num);
  }
  checkCol(num, arr, i, j) {
    return !this.getCol(arr, i, j).includes(num);
  }

  makeSquares(len=3) {
    let arr = [];
    for (let i=0;i<len**2;i++) {
      let numbers = [1,2,3,4,5,6,7,8,9];
      if (i > 0) debugger;
      for (let j=0;j<len**2;j++) {
        let num = this.sample(numbers);
        while (!this.checkRow(num, arr, i, j) || !this.checkCol(num, arr, i, j)) {
          numbers.push(num);
          num = this.sample(numbers);
        }
        arr.push([num,true]);
      }
    }
    return arr;
  }
  // makeSquares(len=3) {
  //   let arr = [];
  //   for (let z=0;z<len**4;z++) {
  //     let val = (z + 1) % 9;
  //     if (val === 0) val = 9;
  //     arr.push([val,true]);
  //   }
  //   return arr;
  // }

  row(idx) {
    return <div className="box-row">
      <Square key={idx} attr={this.grid[idx]}></Square>
      <Square key={idx+1} attr={this.grid[idx+1]}></Square>
      <Square key={idx+2} attr={this.grid[idx+2]}></Square>
    </div>
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

  render() {
    return <div className='board'>
      {this.build()}
    </div>
  }
}

export default Board;