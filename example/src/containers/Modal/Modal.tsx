import * as React from 'react';
import * as ModalContainer from 'react-modal';
import { connect } from 'react-redux';
import { popModalWindow } from 'redux-promising-modals';
import { EditFileDialog, RemoveFileDialog } from '../../components';
import * as modalResultTypes from '../../constants/modalResultTypes';
import { ModalTypes } from '../../constants/modalTypes';
import modalSelector from './modal.selector';

const modalsMap = new Map<ModalTypes, any>([
    [ModalTypes.EditFileDialog, EditFileDialog],
    [ModalTypes.RemoveFileDialog, RemoveFileDialog]
]);

interface IProps {
    modalType: ModalTypes;
    modalProps: any;
    // tslint:disable-next-line:ban-types
    popModalWindow: Function;
}

const Modal = (props: IProps) => {
    const Component = modalsMap.get(props.modalType) || null;

    return Component && (
        <ModalContainer
            isOpen={true}
            contentLabel=""
        >
            <Component
                {...props.modalProps}
                resultTypes={modalResultTypes}
                popModalWindow={props.popModalWindow}
            />
        </ModalContainer>
    );
};

export default connect(modalSelector, { popModalWindow })(Modal);
