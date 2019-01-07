import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { pushModalWindow } from 'redux-promising-modals';
import { ModalResultTypes } from './constants/modalResultTypes';
import { ModalTypes } from './constants/modalTypes';
import { ModalContainer } from './containers';
import { DevTools } from './redux';

interface IProps {
    // tslint:disable-next-line:ban-types
    pushModalWindow: Function;
}

class App extends Component<IProps> {
    public render() {
        return (
            <div className="App">
                <ModalContainer />
                <DevTools />
                <button type="button" onClick={this.handleEditFileBtnClick}>
                    Open edit file dialog
                </button>
                <button type="button" onClick={this.handleRemoveFileBtnClick}>
                    Open remove file dialog
                </button>
            </div>
        );
    }

    private handleEditFileBtnClick = () => {
        this.props.pushModalWindow(ModalTypes.EditFileDialog, { initialFileName: 'my_file.txt' })
            .then(({ status, newFileName }: { status: ModalResultTypes, newFileName: string }) => {
                // ToDo: ajax request and processing
                if (status === ModalResultTypes.Confirm) {
                    console.log('OK. New name: %s', newFileName);
                }
            });
    };

    private handleRemoveFileBtnClick = () => {
        this.props.pushModalWindow(ModalTypes.RemoveFileDialog, { fileName: 'my_file.txt' })
            .then(({ status }: { status: ModalResultTypes }) => {
                // ToDo: ajax request and processing
                if (status === ModalResultTypes.Confirm) {
                    console.log('OK, file removed');
                }
            });
    };
}
export default connect(null, { pushModalWindow })(App);
