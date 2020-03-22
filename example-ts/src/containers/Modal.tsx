import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import ModalContainer from 'react-modal';
import { createSelector } from 'reselect';
import { popModalWindow } from 'redux-promising-modals';

import { EditFileDialog, RemoveFileDialog } from '../components';
import { EDIT_FILE_DIALOG, REMOVE_FILE_DIALOG } from '../constants/modalTypes';
import * as modalResultTypes from '../constants/modalResultTypes';
import { modalsSelector } from '../redux';


const MODALS_MAP = new Map<string, ComponentType<any>>([
    [EDIT_FILE_DIALOG, EditFileDialog],
    [REMOVE_FILE_DIALOG, RemoveFileDialog]
]);

const modalSelector = createSelector(
    modalsSelector,
    modals => ({
        modalType: modals.types[0],
        modalProps: modals.props[0],
    })
);

interface ModalProps {
    modalType: string;
    modalProps: any;
    popModalWindow: popModalWindow;
}

@connect(modalSelector, { popModalWindow })
export function Modal(props: ModalProps) {
    const { modalType, modalProps, popModalWindow } = props;
    const Component = MODALS_MAP.get(modalType) || null;

    return Component && (
        <ModalContainer
            isOpen
            contentLabel="">
            <Component
                {...modalProps}
                resultTypes={modalResultTypes}
                popModalWindow={popModalWindow}
            />
        </ModalContainer>
    );
}
