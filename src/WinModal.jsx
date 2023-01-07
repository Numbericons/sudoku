import React from "react";
import PropTypes from "prop-types";
// import "./stylesheets/modal.scss";

export default class WinModal extends React.Component {
  constructor(props) {
    super(props);
    this.lotus = this.randomLotus();

    this.onClose = this.onClose.bind(this);
  }

  onClose = e => {
    this.props.onClose(e);
  };

  randomLotus() {
    const lotuses = ['lotus1.webp', 'lotus2.webp', 'lotus3.webp'];
    const randIdx = Math.floor(Math.random() * 3);

    return lotuses[randIdx];
  }

  render() {
    if (!this.props.show) return null;

    return (
      <div>
        <div className='modal-backdrop' onClick={this.onClose}></div>
        <div className="modal" id="modal">
          <h2 className="modal-lotus-header">Board Complete</h2>
          <div className="content">
            <img className ='modal-lotus' src={this.lotus} alt='lotus'></img>
          </div>
          <div className="actions">
            <button className="toggle-button" onClick={this.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

WinModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};