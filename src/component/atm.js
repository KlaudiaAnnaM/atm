import React, { Component } from 'react';
import "./atm.scss";

class Atm extends Component {

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

    checkAccountBalance() {
        this.setState({ shouldShowAccountBalance: true, shouldShowInput: false });
    }

    showInput() {
        this.setState({ shouldShowInput: true });
    }

    getAccountBalance() {
        let url = 'http://localhost:3003/account';

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                let lastBalance = data[data.length - 1];
                this.setState({ accountBalance: lastBalance.balance });
            });
    }

    saveNewAccountBalance(value) {
        let url = 'http://localhost:3003/account';

        fetch(url, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "balance": value })
        })
            .then(res => res.json())
            .then(() => {
                this.setState({ accountBalance: value })
            });
    }

    componentDidMount() {
        this.getAccountBalance();
    }

    depostiMoney() {
        this.clearInput();
        this.setState({ shouldShowInput: true, depostiMoney: true, withdrawMoney: false });
    }

    withdrawMoney() {
        this.clearInput();
        this.setState({ shouldShowInput: true, withdrawMoney: true, depostiMoney: false });
    }

    checkWithdrowMoney() {
        if (this.state.inputValue > this.state.accountBalance) {
            alert('Nie masz wystarczających środków na koncie');
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
                    {this.state.shouldShowAccountBalance ?
                        <div>
                            <p>Account balace: {this.state.accountBalance}</p>
                        </div> : null}
                    {this.state.shouldShowInput ? showInputValue : null}
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
                    <button className="cancel" onClick={this.clearInput}>cancel</button>
                    <button className="clear" onClick={this.clearInput}>clear</button>
                    <button className="enter" onClick={this.enter}>enter</button>
                </div>
            </div>
        )
    }

}

export default Atm;