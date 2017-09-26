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
        const { resultTypes: { CONFIRM, CANCEL }, popModalWindow } = this.props;
        const { newFileName } = this.state;

        return (
            <div>
                <label>
                    <span>Enter new filename:</span>
                    <input type="text" value={newFileName} onChange={event => this.handleFileNameChange(event)} />
                </label>
                <button type="button" onClick={() => popModalWindow({ type: CONFIRM, newFileName })}>Confirm</button>
                <button type="button" onClick={() => popModalWindow({ type: CANCEL })}>Cancel</button>
            </div>
        );
    }

    handleFileNameChange(event) {
        this.setState({
            newFileName: event.currentTarget.value
        });
    }
}
