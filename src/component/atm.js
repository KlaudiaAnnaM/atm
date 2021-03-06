import React, { Component } from 'react';
import "./atm.scss";

class Atm extends Component {

    url = 'http://localhost:3003/account';

    constructor(props) {
        super(props)

        this.state = {
            inputValue: '',
            shouldShowAccountBalance: false,
            shouldShowInput: false,
            accountBalance: '',
            depostiMoney: '',
            withdrawMoney: ''
        }

        this.checkAccountBalance = this.checkAccountBalance.bind(this);
        this.showInput = this.showInput.bind(this);
        this.depostiMoney = this.depostiMoney.bind(this);
        this.withdrawMoney = this.withdrawMoney.bind(this);
        this.enter = this.enter.bind(this);
    }

    addValueToInput = e => {
        this.setState({ inputValue: this.state.inputValue + e.target.value });
    }

    clearInput = () => {
        this.setState({ inputValue: " " });
    }

    cancel = () => {
        this.setState({ shouldShowAccountBalance: false, shouldShowInput: false });
    }

    checkAccountBalance() {
        this.setState({ shouldShowAccountBalance: true, shouldShowInput: false });
    }

    showInput() {
        this.setState({ shouldShowInput: true });
    }

    getAccountBalance() {
        fetch(this.url)
            .then(res => res.json())
            .then((data) => {
                let lastBalance = data[data.length - 1];
                this.setState({ accountBalance: lastBalance.balance });
            });
    }

    saveNewAccountBalance(value) {
        fetch(this.url, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "balance": value })
        })
            .then(res => res.json())
            .then(() => {
                this.setState({ accountBalance: value, shouldShowInput: false, shouldShowAccountBalance: true  });
                alert('Transaction was successful')
            });
    }

    componentDidMount() {
        this.getAccountBalance();
    }

    depostiMoney() {
        this.clearInput();
        this.setState({ shouldShowInput: true, depostiMoney: true, withdrawMoney: false, shouldShowAccountBalance: false });
    }

    withdrawMoney() {
        this.clearInput();
        this.setState({ shouldShowInput: true, withdrawMoney: true, depostiMoney: false, shouldShowAccountBalance: false });
    }

    checkWithdrowMoney() {
        if (this.state.inputValue > this.state.accountBalance) {
            alert('You do not have enough account balance');
        } else {
            var balacneAfterWithdraw = Number(this.state.accountBalance) - Number(this.state.inputValue);
            this.setState({ accountBalance: balacneAfterWithdraw, inputValue: " " });
            this.saveNewAccountBalance(balacneAfterWithdraw);
        }
    }

    enter() {
        if (this.state.depostiMoney) {
            let balanceAfterDeposit = Number(this.state.accountBalance) + Number(this.state.inputValue);
            this.setState({ accountBalance: balanceAfterDeposit, inputValue: " " });
            this.saveNewAccountBalance(balanceAfterDeposit);
        } else if (this.state.withdrawMoney) {
            this.checkWithdrowMoney();
        }
    }

    render() {
        const showInputValue = <div className="screen-value">{this.state.inputValue}</div>

        return (
            <div className="keyboard-container ">

                <div className="screen-container">
                    <div className="action-buttons-container">
                        <button onClick={this.checkAccountBalance}>Check account balance</button>
                        <button onClick={this.depostiMoney}>Deposit money</button>
                        <button onClick={this.withdrawMoney}>Withdraw money</button>
                    </div>
                    <div className="account-balance-show">
                        {this.state.shouldShowAccountBalance ?
                            <div>
                                <p>Account balace:
                                    <br />
                                    {this.state.accountBalance}</p>
                            </div> : null}
                    </div>
                    <div className="input-show">
                        {this.state.shouldShowInput ? showInputValue : null}
                    </div>
                </div>

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
                    <button className="cancel" onClick={this.cancel}>cancel</button>
                    <button className="clear" onClick={this.clearInput}>clear</button>
                    <button className="enter" onClick={this.enter}>enter</button>
                </div>
            </div>
        )
    }

}

export default Atm;