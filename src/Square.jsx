import React from 'react';
import logo from './logo.svg';

class Square extends React.Component {
  constructor(props) {
    super(props);
    if (!props.attr) return;
    this.state = {
      value: props.attr[0],
      revealed: props.attr[1]
    }
  }

  render() {
    const val = this.state.revealed ? this.state.value : "";
    
    return <div className='square'>
      <img src={logo} className="App-logo" alt="logo" />
      {val}
    </div>
  }
}

export default Square;