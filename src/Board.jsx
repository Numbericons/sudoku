import React from 'react';
import Square from './Square.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.grid = this.build(props.gridLen);
  }

  build(gridLen=3) {
    let grid = [];
    for (let y=0;y<gridLen;y++) { grid.push([])};
    for (let z=0;z<grid.length;z++) {
      // for (let x=0;x<gridLen;x++) { grid[z].push(<Square></Square>) }
    }
    return grid;
  }

  render() {
    return <div>
      {this.grid}
    </div>
  }
}

export default Board;