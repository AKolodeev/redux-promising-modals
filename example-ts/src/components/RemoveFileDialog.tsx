import React from 'react';
import { popModalWindow } from 'redux-promising-modals'

import * as modalResultTypes from '../constants/modalResultTypes';


interface RemoveFileDialogProps {
    fileName: string;
    resultTypes: typeof modalResultTypes;
    popModalWindow: popModalWindow;
}


export function RemoveFileDialog(props: RemoveFileDialogProps) {
    const { fileName, resultTypes: { MODAL_TYPE_CONFIRM, MODAL_TYPE_CANCEL }, popModalWindow } = props;

    return (
        <div>
            <p>Remove {fileName}?</p>
            <button type="button" onClick={() => popModalWindow({ status: MODAL_TYPE_CONFIRM })}>Confirm</button>
            <button type="button" onClick={() => popModalWindow({ status: MODAL_TYPE_CANCEL })}>Cancel</button>
        </div>
    );
}
