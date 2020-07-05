import React from 'react';

class Number extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
  }

  render() {
    let container = this.props.selected ? 'selected' : 'number';
    return <div className={container} onClick={this.props.select}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }
}

export default Number;