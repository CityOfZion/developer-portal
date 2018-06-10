import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import PropTypes from 'prop-types';

class ErrorModal extends Component {
    render() {
        const {opened, type, title, message, disableConfirm, disableCancel, confirmText, cancelText} = this.props;

        return <Modal isOpen={opened} className={this.props.type ? `modal-${type}` : `modal-primary`}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                {!disableConfirm ? <Button color="primary"
                                           onClick={e => this.props.callback(true)}>{confirmText ? confirmText : 'Confirm'}</Button> : ''}
                {!disableCancel ? <Button color="secondary"
                                          onClick={e => this.props.callback(false)}>{cancelText ? cancelText : 'Cancel'}</Button> : ''}
            </ModalFooter>
        </Modal>
    }
}

ErrorModal.PropTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    opened: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    disableConfirm: PropTypes.bool,
    disableCancel: PropTypes.bool,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    type: PropTypes.string
};

export default ErrorModal;