import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalContainer from 'react-modal';
import { popModalWindow } from 'redux-promising-modals';
import { EditFileDialog, RemoveFileDialog } from '../../components';
import { ModalResultTypes } from '../../constants';
import modalSelector from './modal.selector';

const Modal = props => {
    const { modalType, modalProps, popModalWindow } = props;
    let Component;

    switch (modalType) {
    case 'EDIT_FILE_DIALOG':
        Component = EditFileDialog;
        break;
    case 'REMOVE_FILE_DIALOG':
        Component = RemoveFileDialog;
        break;
    default:
        Component = false;
    }

    return Component && (
        <ModalContainer
            isOpen
            contentLabel=""
        >
            <Component
                {...modalProps}
                resultTypes={ModalResultTypes}
                popModalWindow={popModalWindow}
            />
        </ModalContainer>
    );
};

Modal.propTypes = {
    modalType: PropTypes.string,
    modalProps: PropTypes.any
};

export default connect(modalSelector, { popModalWindow })(Modal);
