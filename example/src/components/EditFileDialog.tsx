import * as React from 'react';
import { ChangeEvent, Component } from 'react';

import { ModalResultTypes } from '../constants/modalResultTypes';

interface IProps {
    initialFileName?: string;
    resultTypes: typeof ModalResultTypes;
    // tslint:disable-next-line:ban-types
    popModalWindow: Function;
}

interface IState {
    newFileName: string;
}

export default class EditFileDialog extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            newFileName: props.initialFileName || ''
        }
    }

    public render() {
        const { newFileName } = this.state;

        return (
            <div>
                <label>
                    <span>Enter new filename:</span>
                    <input type="text" value={newFileName} onChange={this.handleFileNameChange} />
                </label>
                <button type="button" onClick={this.handleConfirmBtnClick}>Confirm</button>
                <button type="button" onClick={this.handleCancelBtnClick}>Cancel</button>
            </div>
        );
    }

    private handleFileNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newFileName: event.target.value
        });
    };

    private handleConfirmBtnClick = () => {
        const { resultTypes, popModalWindow } = this.props;
        const { newFileName } = this.state;

        // Close the modal with confirm status and provide new file name
        popModalWindow({ status: resultTypes.Confirm, newFileName });
    };

    private handleCancelBtnClick = () => {
        const { resultTypes, popModalWindow } = this.props;

        // Just closing the modal
        popModalWindow({ status: resultTypes.Cancel });
    };
}
