import React, { Component, ChangeEvent } from 'react';
import { popModalWindow } from 'redux-promising-modals';

import * as modalResultTypes from '../constants/modalResultTypes';


interface EditFileDialogPropTypes {
    initialFileName: string;
    resultTypes: typeof modalResultTypes;
    popModalWindow: popModalWindow;
};

interface EditFileDialogState {
    newFileName: string;
}

export class EditFileDialog extends Component<EditFileDialogPropTypes, EditFileDialogState> {
    static defaultProps = {
        initialFileName: ''
    };

    state = {
        newFileName: this.props.initialFileName
    };

    render() {
        const { newFileName } = this.state;

        return (
            <div>
                <label>
                    <span>Enter a new file name:</span>
                    <input type="text" value={newFileName} onChange={event => this.handleFileNameChange(event)} />
                </label>
                <button type="button" onClick={() => this.handleConfirmBtnClick()}>Confirm</button>
                <button type="button" onClick={() => this.handleCancelBtnClick()}>Cancel</button>
            </div>
        );
    }

    handleFileNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            newFileName: event.currentTarget.value
        });
    }

    handleConfirmBtnClick() {
        const { resultTypes: { MODAL_TYPE_CONFIRM }, popModalWindow } = this.props;
        const { newFileName } = this.state;

        // Close the modal with the confirm status and provide a new file name
        popModalWindow({ status: MODAL_TYPE_CONFIRM, newFileName });
    }

    handleCancelBtnClick() {
        const { resultTypes: { MODAL_TYPE_CANCEL }, popModalWindow } = this.props;

        // Just close the modal
        popModalWindow({ status: MODAL_TYPE_CANCEL });
    }
}
