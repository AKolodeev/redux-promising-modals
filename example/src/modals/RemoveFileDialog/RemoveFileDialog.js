import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { popModalWindow } from 'redux-promising-modals';
import { CONFIRM, CANCEL } from '../resultTypes';

class RemoveFileDialog extends Component {
    static propTypes = {
        fileName: PropTypes.string.isRequired
    };

    render() {
        const { fileName, popModalWindow } = this.props;

        return (
            <div>
                <p>Remove {fileName}?</p>
                <button type="button" onClick={() => popModalWindow({ type: CONFIRM })}>Confirm</button>
                <button type="button" onClick={() => popModalWindow({ type: CANCEL })}>Cancel</button>
            </div>
        );
    }
}

export default connect(state => state, { popModalWindow })(RemoveFileDialog);
