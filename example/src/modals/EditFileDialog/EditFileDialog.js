import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { popModalWindow } from 'redux-promising-modals';
import { CONFIRM, CANCEL } from '../resultTypes';

class EditFileDialog extends Component {
    static propTypes = {
        initialFileName: PropTypes.string
    };

    static defaultProps = {
        initialFileName: ''
    };

    state = {
        newFileName: this.props.initialFileName
    };

    render() {
        const { popModalWindow } = this.props;
        const { newFileName } = this.state;

        return (
            <div>
                <label>
                    Enter new filename:
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

export default connect(state => state, { popModalWindow })(EditFileDialog);
