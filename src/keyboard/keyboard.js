import React, { Component } from 'react';
import Screen from '../screen/screen';
import DepositMoney from '../screen/deposit-money/deposit-money';
import "./keyboard.scss";

class Keyboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputValue: '',
            shouldShowAccountBalance: false,
            shouldShowInput: false,
            accountBalance: ''
        }

        this.checkAccountBalance = this.checkAccountBalance.bind(this);
        this.showInput = this.showInput.bind(this);
    }

    addValueToInput = e => {
        this.setState({ inputValue: this.state.inputValue + e.target.value });
    }

    clearInput = () => {
        this.setState({ inputValue: " " });
    }

    checkAccountBalance() {
        this.setState({ shouldShowAccountBalance: true });
    }

    showInput() {
        this.setState({ shouldShowInput: true });
    }

    getAccountBalance() {
        let url = 'http://localhost:3003/account';

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.warn(data.balance);
                this.setState({ accountBalance: data.balance });
            })
    }

    componentDidMount() {
        this.getAccountBalance();
    }

    render() {
        let shouldShowInput;
        if (this.state.inputValue) {
            shouldShowInput = <DepositMoney value={this.state.inputValue} />
        }

        const showInputValue = <div className="screen-value">{this.props.value}</div>

        return (
            <div className="keyboard-container ">
                {/* <Screen value={this.state.inputValue} /> */}
                <div className="screen-container">
                    <div className="action-buttons-container">
                        <button onClick={this.checkAccountBalance}>Check account balance</button>
                        <button onClick={this.showInput}>Deposit money</button>
                        <button onClick={this.showInput}>Withdraw money</button>
                    </div>
                    {this.state.shouldShowAccountBalance ?
                        <div>
                            <p>Account balace: {this.state.accountBalance}</p>
                        </div> : null}
                    {this.state.shouldShowInput ? showInputValue : null}
                </div>
                {/* {shouldShowInput} */}
                <div className="keyboard numeric" onClick={e => this.addValueToInput(e, "value")}>
                    <button value="1">1</button>
                    <button value="2">2</button>
                    <button value="3">3</button>

                    <button value="4">4</button>
                    <button value="5">5</button>
                    <button value="6">6</button>

                    <button value="7">7</button>
                    <button value="8">8</button>
                    <button value="9">9</button>

                    <button></button>
                    <button value="0">0</button>
                    <button></button>
                </div>
                <div className="keyboard action">
                    <button className="cancel" onClick={this.clearInput}>cancel</button>
                    <button className="clear" onClick={this.clearInput}>clear</button>
                    <button className="enter">enter</button>
                </div>
            </div>
        )
    }

}

export default Keyboard;