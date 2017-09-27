import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditFileDialog extends Component {
    static propTypes = {
        initialFileName: PropTypes.string,
        resultTypes: PropTypes.object,
        popModalWindow: PropTypes.func
    };

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
                    <span>Enter new filename:</span>
                    <input type="text" value={newFileName} onChange={event => this.handleFileNameChange(event)} />
                </label>
                <button type="button" onClick={() => this.handleConfirmBtnClick()}>Confirm</button>
                <button type="button" onClick={() => this.handleCancelBtnClick()}>Cancel</button>
            </div>
        );
    }

    handleFileNameChange(event) {
        this.setState({
            newFileName: event.currentTarget.value
        });
    }

    handleConfirmBtnClick() {
        const { resultTypes: { CONFIRM }, popModalWindow } = this.props;
        const { newFileName } = this.state;

        // Close the modal with "CONFIRM" status and provide new file name
        popModalWindow({ status: CONFIRM, newFileName });
    }

    handleCancelBtnClick() {
        const { resultTypes: { CANCEL }, popModalWindow } = this.props;

        // Just closing the modal
        popModalWindow({ status: CANCEL });
    }
}
