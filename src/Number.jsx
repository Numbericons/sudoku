import React from 'react';

class Number extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
    this.notes = this.notes.bind(this);
  }

  reload() {
    window.location.reload();
  }
  
  refresh() {
    return <div className='number' onClick={this.reload}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }

  notes() {
    debugger;
    return <div className='number' onClick={this.props.setNotes}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }

  render() {
    if (this.props.refresh) return this.refresh();
    if (this.props.isNotes) return this.notes();
    let container = this.props.selected ? 'selected' : 'number';
    return <div className={container} onClick={this.props.select}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }
}

export default Number;