import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import "./screen.scss";
import AccountBalance from './account-balance/account-balance';
import WithdrawMoney from './withdraw-money/withdraw-money';
import DepositMoney from './deposit-money/deposit-money';
import WelcomeScreen from './welcome-screen/welcome-screen';
import KeyboardValue from './keyboard-value/keyboard-value'

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldShowAccountBalance: false,
            shouldShowInput: false
        };
        this.checkAccountBalance = this.checkAccountBalance.bind(this);
        this.showInput = this.showInput.bind(this);
    }

    checkAccountBalance() {
        this.setState({ shouldShowAccountBalance: true });
    }

    showInput() {
        this.setState({ shouldShowInput: true });
    }

    render() {

        const showInputValue = <div className="screen-value">{this.props.value}</div>

        return (
            <div className="screen-container">
                    <Router>
                        <Link to="/"></Link>
                        <Link to="/account-balance"><button>Check account balance</button></Link>
                        <Link to="/deposit-money"><button>Deposit money</button></Link>
                        <Link to="/withdraw-money"><button >Withdraw money</button></Link>
                        <Route path="/"/>
                        <Route path="/account-balance" component={AccountBalance} />
                        <Route path="/deposit-money" component={DepositMoney} />
                        <Route path="/withdraw-money" component={WithdrawMoney} />
                    </Router>
                {/* <div className="action-buttons-container">
                    <button onClick={this.checkAccountBalance}>Check account balance</button>
                    <button onClick={this.showInput}>Deposit money</button>
                    <button onClick={this.showInput}>Withdraw money</button>
                </div>
                {this.state.shouldShowAccountBalance ? <AccountBalance /> : null}
                {this.state.shouldShowInput ? showInputValue : null} */}
            </div>
        )
    }
}

export default Screen;