import { Tabs, Tab } from 'react-bootstrap'
import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Nav from './Nav.js';

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {

    //check if MetaMask exists
    if(typeof window.ethereum !== 'undefined'){

        const web3 = new Web3(window.ethereum)
        const netId = await web3.eth.net.getId()
        const accounts = await web3.eth.getAccounts()
        const chainId = await web3.eth.chainId
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
        try {
            window.ethereum.enable().then(function() {
                console.log('acct;', web3.eth.getAccounts())
            // User has allowed account access to DApp...
            });
        } catch (e) {
            // User has denied account access to DApp...
        }
    } else {
        window.alert('Please install metamask')
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
      <div className='text-monospace'>
        <Nav/>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1 class="hero">Welcome to RealEstate Royalties</h1>
          <h2>{this.state.account}</h2>
          <br></br>
            <a href="" class="button w-button">Mint Token</a>
        </div>
      </div>
    );
  }
};

export default App;