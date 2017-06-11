import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalContainer from 'react-modal';
import { popModalWindow } from 'redux-promising-modals';

class Modal extends Component {
    render() {
        return (
            false && <ModalContainer>
            </ModalContainer>
        );
    }
}

export default connect(null, { popModalWindow })(Modal);
