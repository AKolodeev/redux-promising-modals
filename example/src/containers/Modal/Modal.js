import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalContainer from 'react-modal';
import { popModalWindow } from 'redux-promising-modals';
import { EditFileDialog, RemoveFileDialog } from '../../components';
import { EDIT_FILE_DIALOG, REMOVE_FILE_DIALOG } from '../../constants/modalTypes';
import * as modalResultTypes from '../../constants/modalResultTypes';
import modalSelector from './modal.selector';

const modalsMap = new Map([
    [EDIT_FILE_DIALOG, EditFileDialog],
    [REMOVE_FILE_DIALOG, RemoveFileDialog]
]);

const Modal = props => {
    const { modalType, modalProps, popModalWindow } = props;
    const Component = modalsMap.get(modalType) || null;

    return Component && (
        <ModalContainer
            isOpen
            contentLabel=""
        >
            <Component
                {...modalProps}
                resultTypes={modalResultTypes}
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
