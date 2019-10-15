import React, { Component } from 'react';
import "./keyboard-value.scss";


class KeyboardValue extends Component {
    render() {
        return (
            <div>
                <h3>Insert value</h3>
                <div className="keyboard-value">{this.props.value}</div>
            </div>
        )
    }
}

export default KeyboardValue;