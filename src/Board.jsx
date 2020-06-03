import React from 'react';
import Square from './Square.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.grid = this.build(props.squares, props.gridLen);
  }

  makeSquares(len) {
    let arr = [];
    for (let z=0;z<len**4;z++) { arr.push([z,true]) };
    return arr;
  }

  build(gridLen=3) {
    let sqAttrs = this.makeSquares(gridLen);
    debugger
    let grid = [];
    for (let y=0;y<gridLen**gridLen;y++) { grid.push([])};
    for (let z=0;z<grid.length;z++) {
      for (let x=0;x<gridLen;x++) { 
        const attr = sqAttrs.shift();
        grid[z].push(<Square key={z.toString() + x.toString()} attr={attr}></Square>);
      }
    }
    return grid;
  }
// squares={squares}
  render() {
    // const row1 = this.getRow();
    return <div className='board'>
      {this.grid}
    </div>
  }
}

export default Board;