import React from "react";
import PropTypes from "prop-types";
// import "./stylesheets/modal.scss";

export default class WinModal extends React.Component {
  onClose = e => {
    this.props.onClose(e);
  };

  randomLotus() {
    const lotuses = ['lotus1.png', 'lotus2.png', 'lotus3.png'];
    const randIdx = Math.floor(Math.random() * 3);

    return lotuses[randIdx];
  }

  render() {
    if (!this.props.show) return null;

    let lotus = this.randomLotus();

    return (
      <div className="modal" id="modal">
        <h2>Well done, board complete!</h2>
        <div className="content">
          <img className ='modal-lotus' src={lotus} alt='lotus'></img>
        </div>
        <div className="actions">
          <button className="toggle-button" onClick={this.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

WinModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};