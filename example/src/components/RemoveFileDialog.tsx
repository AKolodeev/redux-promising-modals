import * as React from 'react';
import { ModalResultTypes } from '../constants/modalResultTypes';

interface IProps {
    fileName: string;
    resultTypes: typeof ModalResultTypes;
    // tslint:disable-next-line:ban-types
    popModalWindow: Function;
}

const RemoveFileDialog = (props: IProps) => {
    const { fileName, resultTypes, popModalWindow } = props;

    const handleConfirmBtnClick = () => popModalWindow({ status: resultTypes.Confirm });
    const handleCancelBtnClick = () => popModalWindow({ status: resultTypes.Confirm });

    return (
        <div>
            <p>Remove {fileName}?</p>
            <button type="button" onClick={handleConfirmBtnClick}>Confirm</button>
            <button type="button" onClick={handleCancelBtnClick}>Cancel</button>
        </div>
    );
};

export default RemoveFileDialog;
