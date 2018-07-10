import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Leifs Hawaiin Shirt Store</h1>
        </header>
        <img src='shirt.jpg' alt='hawaiin shirt' width="300" height="300"/>
        <p>Buy this fine Hawaiin Shirt</p>
        <PurchaseForm> </PurchaseForm>
      </div>
    );
  }
}

class PurchaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ccnum: '', message: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callApi = async (path) => {
    const response = await fetch(path);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleChange(event) {
    this.setState({ccnum: event.target.value, message: ''});
  }

  handleSubmit(event) {
    var path = '/api/pay?cost=10&itemname=hawaiin&quantity=1&ccnum=' + this.state.ccnum;
    this.callApi(path)
      .then(res => this.setState({ message: res.express }))
      .catch(err => console.log(err));

    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Credit Card Number:
          <input type="text" value={this.state.ccnum} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Purchase!" />
      </form>
      <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
