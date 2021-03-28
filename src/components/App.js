import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Nav from './Nav.js';
import Hero from './Hero.js';

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {

    //check if MetaMask exists
    if(window.ethereum){


    } else {
        window.alert('Please install metamask');
        return
    }

  }


  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
    }
  }

  render() {
    return (
      <>

        <Nav/>
        <Hero/>
      </>
    );
  }
};

export default App;