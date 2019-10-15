import React, { Component } from 'react';
import KeyboardValue from '../keyboard-value/keyboard-value';

class DepositMoney extends Component {

    render() {
        return(
            <div>
                <h2>Deposit money</h2>
                <div className="keyboard-value">{this.props.value}</div>
            </div>
        )
    }
}

export default DepositMoney;