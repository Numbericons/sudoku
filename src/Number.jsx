import React from 'react';

class Number extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
  }

  render() {
    return <div className='number'>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }
}

export default Number;