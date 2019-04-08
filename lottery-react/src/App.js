import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  async componentDidUpdate() {
    // const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ players, balance })
  }

  onSubmit = async (event) => {
    event.preventDefault();//待了解清楚
    const account = web3.currentProvider.selectedAddress;
    this.setState({ message: 'Waiting on transaction dealing ...' })
    // 需要一个过渡动画
    await lottery.methods.enter().send({
      from: account,
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered' });
  }

  onClick = async () => {
    const account = web3.currentProvider.selectedAddress;
    this.setState({ message: 'Waiting on transaction dealing...' });

    await lottery.methods.pickWinner().send({
      from: account
    });

    this.setState({ message: 'A winner has been picked!' });

  }

  render() {
    return (
      <div>
        <h2>lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}
          <br></br>There are currently {this.state.players.length} people enter competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether
          <br></br>
          <ul>Player list : {this.state.players.map(
            (player) => {
              return (
                <li>{player}</li>
              )
            }
          )}
          </ul>
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try you lucky?</h4>
          <div>
            <label>Amout of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({
                value: event.target.value
              })}
            />
          </div>
          <button>enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner</button>

        <h1>{this.state.message}</h1>

      </div>

    );
  }
}

export default App;
