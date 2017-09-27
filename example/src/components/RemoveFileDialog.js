import React from 'react';
import PropTypes from 'prop-types';

const RemoveFileDialog = props => {
    const { fileName, resultTypes: { MODAL_TYPE_CONFIRM, MODAL_TYPE_CANCEL }, popModalWindow } = props;

    return (
        <div>
            <p>Remove {fileName}?</p>
            <button type="button" onClick={() => popModalWindow({ status: MODAL_TYPE_CONFIRM })}>Confirm</button>
            <button type="button" onClick={() => popModalWindow({ status: MODAL_TYPE_CANCEL })}>Cancel</button>
        </div>
    );
};

RemoveFileDialog.propTypes = {
    fileName: PropTypes.string.isRequired,
    resultTypes: PropTypes.object,
    popModalWindow: PropTypes.func.isRequired
};

export default RemoveFileDialog;
