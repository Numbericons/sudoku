import React from 'react';

class Svg extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.className = this.props.className
  //   this.fill1 = this.props.fill1;
  // }

  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80">
      <circle r="39" fill={this.props.fill1} stroke={this.props.fill2} strokeWidth="1" />
      <path fill={this.props.fill2} d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" />
      <circle r="5" cy="19" fill={this.props.fill2} />
      <circle r="5" cy="-19" fill={this.props.fill1} />
    </svg>
  }
}

export default Svg;