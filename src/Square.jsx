import React from 'react';
// import logo from './logo.svg';

class Square extends React.Component {
  constructor(props) {
    super(props);
    if (!props.attr) return;
    this.state = {
      value: props.attr[0],
      revealed: props.attr[1],
      entered: null
    }
  }
  
  render() {
    let val = this.state.revealed ? this.state.value : "";
    if (this.state.entered) val = this.state.entered;
    
    return <div className='square'>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <h3 className='square-text'>
        {val}
      </h3>
    </div>
  }
}

export default Square;