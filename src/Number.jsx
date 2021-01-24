import React from 'react';

class Number extends React.Component {
  constructor(props) {
    super(props);
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

  btnOn() {
    let border = this.props.notesOn ? 'btn-on' : 'number';
    if (this.props.checkOn) border = 'btn-on';
    let click = this.props.setNotes || this.props.setCheck;

    return <div className={border} onClick={click}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }

  render() {
    if (this.props.isRefresh) return this.refresh();
    if (this.props.isNotes || this.props.checkVal) return this.btnOn();

    let container = this.props.selected ? 'selected' : 'number';
    
    return <div className={container} onClick={this.props.select}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }
}

export default Number;