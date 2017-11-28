import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class ErrorModal extends Component {
  render() {
    console.log('render error modal');
    return <Modal isOpen={this.props.opened} className={this.props.type ? `modal-${this.props.type}` : `modal-primary`}>
      <ModalHeader>{this.props.title}</ModalHeader>
      <ModalBody>
        {this.props.message}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={e => this.props.callback(true)}>Confirm</Button>
        <Button color="secondary" onClick={e => this.props.callback(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  }
}

ErrorModal.PropTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default ErrorModal;