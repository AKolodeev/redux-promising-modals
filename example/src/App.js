import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pushModalWindow } from 'redux-promising-modals';
import { Modal } from './modals';

class App extends Component {
    static propTypes = {
        pushModalWindow: PropTypes.func
    };

    render() {
        const { pushModalWindow } = this.props;

        return (
            <div className="App">
                <Modal />
                <button onClick={() => pushModalWindow()}></button>
            </div>
        );
    }
}

export default connect(state => state, { pushModalWindow })(App);
