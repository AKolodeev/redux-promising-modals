import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushModalWindow } from 'redux-promising-modals';

import { Modal } from './containers/Modal';
import { MODAL_TYPE_CONFIRM } from './constants/modalResultTypes';
import { EDIT_FILE_DIALOG, REMOVE_FILE_DIALOG } from './constants/modalTypes';
import { AppDevTools } from './redux';


interface AppProps {
  pushModalWindow: pushModalWindow
}

@connect(null, { pushModalWindow })
class App extends Component<AppProps> {
    render() {
        return (
            <div className="App">
                <Modal />
                <AppDevTools />
                <button type="button" onClick={() => this.handleEditFileBtnClick()}>
                    Open edit file dialog
                </button>
                <button type="button" onClick={() => this.handleRemoveFileBtnClick()}>
                    Open remove file dialog
                </button>
            </div>
        );
    }

    handleEditFileBtnClick() {
        this.props.pushModalWindow(EDIT_FILE_DIALOG, { initialFileName: 'my_file.txt' })
            .then(({ status, newFileName }) => {
                // ToDo: ajax request and processing
                if (status === MODAL_TYPE_CONFIRM) {
                    console.log('OK. New name: %s', newFileName);
                }
            });
    }

    handleRemoveFileBtnClick() {
        this.props.pushModalWindow(REMOVE_FILE_DIALOG, { fileName: 'my_file.txt' })
            .then(({ status }) => {
                // ToDo: ajax request and processing
                if (status === MODAL_TYPE_CONFIRM) {
                    console.log('OK, file removed');
                }
            });
    }
}
