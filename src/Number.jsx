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
    let border = this.props.notesOn ? 'btn-notes' : 'number';
    if (this.props.checkOn) border = 'btn-check';
    let click = this.props.setNotes || this.props.setCheck;

    return <div className={border} onClick={click}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }

  background() {
    const backgroundClass = this.props.backgroundOn ? 'number-background-on' : 'number';

    return <div className={backgroundClass} onClick={this.props.setBackground}>
      <h1 className='number-text'>{this.props.backgroundNum}</h1>
    </div>
  }

  backgroundModal() {
    return <div className='number' onClick={this.props.showBackgroundModal}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }

  info() {
    return <div className='number' onClick={this.props.showInfo}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }

  darkmode() {
    return <div className='number' onClick={this.props.toggleDarkmode}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }

  render() {
    if (this.props.isRefresh) return this.refresh();
    if (this.props.isNotes || this.props.checkVal) return this.btnOn();
    if (this.props.backgroundModal) return this.backgroundModal();
    if (this.props.isBackground) return this.background();
    if (this.props.isInfo) return this.info();
    if (this.props.darkmode) return this.darkmode();

    let container = this.props.selected ? 'selected' : 'number';

    return <div className={container} onClick={this.props.select}>
      <h1 className='number-text'>{this.state.value}</h1>
    </div>
  }
}

export default Number;