import React from 'react';
import PropTypes from 'prop-types';

const RemoveFileDialog = props => {
    const { fileName, resultTypes: { CONFIRM, CANCEL }, popModalWindow } = props;

    return (
        <div>
            <p>Remove {fileName}?</p>
            <button type="button" onClick={() => popModalWindow({ type: CONFIRM })}>Confirm</button>
            <button type="button" onClick={() => popModalWindow({ type: CANCEL })}>Cancel</button>
        </div>
    );
};

RemoveFileDialog.propTypes = {
    fileName: PropTypes.string.isRequired,
    resultTypes: PropTypes.object,
    popModalWindow: PropTypes.func.isRequired
};

export default RemoveFileDialog;
