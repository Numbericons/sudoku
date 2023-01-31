import React from 'react';
import Svg from "./Svg.jsx";

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
    return <div className={this.props.darkmodeOn ? 'number-dark' : 'number'} onClick={this.reload}>
      <h1 className={this.props.darkmodeOn ? 'number-text-dark' : 'number-text'}>{this.state.value}</h1>
    </div>
  }

  checkMode() {
    let border = this.props.darkmodeOn ? 'number-dark' : 'number';
    if (this.props.checkOn) border = this.props.darkmodeOn ? 'btn-check-dark' : 'btn-check';

    return <div className={border} onClick={this.props.setCheck}>
      <h1 className={this.props.darkmodeOn ? 'number-text-check-dark' : 'number-text-check'}>{this.state.value}</h1>
    </div>
  }

  notes() {
    let border = this.props.notesOn ? 'btn-notes' : this.props.darkmodeOn ? 'number-dark' : 'number';

    return <div className={border} onClick={this.props.setNotes}>
      <h1 className={this.props.darkmodeOn ? 'number-text-dark' : 'number-text'}>{this.state.value}</h1>
    </div>
  }

  background() {
    const backgroundClass = this.props.backgroundOn ? 'number-background-on' : 
      this.props.darkmodeOn ? 'number-dark' : 'number';

    return <div className={backgroundClass} onClick={this.props.setBackground}>
      <h1 className={this.props.darkmodeOn ? 'number-text-dark' : 'number-text'}>{this.props.backgroundNum}</h1>
    </div>
  }

  backgroundModal() {
    return <div className={this.props.darkmodeOn ? 'number-dark' : 'number'} onClick={this.props.showBackgroundModal}>
      <h1 className={this.props.darkmodeOn ? 'number-text-dark' : 'number-text'}>{this.state.value}</h1>
    </div>
  }

  info() {
    return <div className={this.props.darkmodeOn ? 'number-dark' : 'number'} onClick={this.props.showInfo}>
      <h1 className={this.props.darkmodeOn ? 'number-text-dark' : 'number-text'}>{this.state.value}</h1>
    </div>
  }

  darkmode() {
    const fill1 = this.props.darkmodeOn ? "black" : "white";
    const fill2 = this.props.darkmodeOn ? "white" : "black";

    return <div className={this.props.darkmodeOn ? 'number-dark' : 'number'} onClick={this.props.toggleDarkmode}>
      <h1 className={this.props.darkmodeOn ? 'number-darkmode-dark' : 'number-darkmode'}>
        <Svg fill1={fill1} fill2={fill2}></Svg>
      </h1>
    </div>
  }

  render() {
    if (this.props.isRefresh) return this.refresh();
    if (this.props.isNotes) return this.notes();
    if (this.props.checkVal) return this.checkMode();
    if (this.props.backgroundModal) return this.backgroundModal();
    if (this.props.isBackground) return this.background();
    if (this.props.isInfo) return this.info();
    if (this.props.darkmode) return this.darkmode();

    let container;
    
    if (this.props.selected) {
      container = this.props.darkmodeOn ? 'selected-dark' : 'selected';
    } else {
      container = this.props.darkmodeOn ? 'number-dark' : 'number';
    }

    return <div className={container} onClick={this.props.select}>
      <h1 className={this.props.darkmodeOn ? 'number-text-dark' : 'number-text'}>{this.state.value}</h1>
    </div>
  }
}

export default Number;