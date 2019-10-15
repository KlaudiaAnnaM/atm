import React, { Component } from 'react';
import "./account-balance.scss";

class AccountBalance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accountBalance: ''
        }
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
        return (
            <div className="container-welcome">
                <div>
                    <p>Account balace: {this.state.accountBalance}</p>
                </div>
            </div>
        )
    }
}

export default AccountBalance;