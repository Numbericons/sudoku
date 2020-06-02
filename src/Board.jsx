import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>
      {this.props.bananas}
      Hello world
    </div>
  }
}

export default Board;