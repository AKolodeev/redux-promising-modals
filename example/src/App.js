import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pushModalWindow } from 'redux-promising-modals';
import { DevTools } from './redux';
import { ModalContainer } from './containers';
import { ModalResultTypes } from './constants';

class App extends Component {
    static propTypes = {
        pushModalWindow: PropTypes.func
    };

    render() {
        return (
            <div className="App">
                <ModalContainer />
                <DevTools />
                <button onClick={() => this.handleEditFileBtnClick()}>
                    Open edit file dialog
                </button>
                <button onClick={() => this.handleRemoveFileBtnClick()}>
                    Open remove file dialog
                </button>
            </div>
        );
    }

    handleEditFileBtnClick() {
        this.props.pushModalWindow('EDIT_FILE_DIALOG', { initialFileName: 'my_file.txt' })
            .then(({ type, newFileName }) => {
                if (type === ModalResultTypes.CONFIRM) {
                    console.log('OK. New name: %s', newFileName);
                }
            });
    }

    handleRemoveFileBtnClick() {
        this.props.pushModalWindow('REMOVE_FILE_DIALOG', { fileName: 'my_file.txt' })
            .then(({ type }) => {
                if (type === ModalResultTypes.CONFIRM) {
                    console.log('OK, file removed');
                }
            });
    }
}
export default connect(state => state, { pushModalWindow })(App);
