import React from 'react';

class Number extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value
    }
  }

  reload() {
    window.location.reload();
  }
  
  refresh() {
    return <div className='number' onClick={this.reload}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }

  render() {
    if (this.props.refresh) return this.refresh();
    let container = this.props.selected ? 'selected' : 'number';
    return <div className={container} onClick={this.props.select}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }
}

export default Number;