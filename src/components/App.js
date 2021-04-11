import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Nav from './Nav.js';
import Hero from './Hero.js';
import GetAppToDisplay from './GetAppToDisplay.js';
import realEstateNFT from '../abis/RealEstateNFT.json'
import { useState } from 'react'

class App extends Component {


  async UNSAFE_componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {

    //check if MetaMask exists
    if(window.ethereum){
        const web3 = new Web3(ethereum);

        const accounts = await web3.eth.getAccounts();

//        const balance = await web3.eth.getBalance(accounts[0]);
        const netId = await web3.eth.net.getId();
        const nfTitle = new web3.eth.Contract(realEstateNFT.abi, realEstateNFT.networks[netId].address);

        this.setState({netId: netId, nfTitle: nfTitle, showConnectToWeb3: false, account: accounts[0],  web3: web3});

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
      componentToDisplay: 'hero'
    }
  }
  updateAppOnDisplay = (componentName) => {
      this.setState({
        ...this.state,
        componentToDisplay: componentName,
      })
  }
  updateWeb3Params = (netId, nfTitle, account) => {
    console.log('updating aaccount to', account);
    this.setState({
      ...this.state,
      netId: netId,
      nfTitle: nfTitle,
      account: account
    })

  }
  render() {
    return (
      <>
        <Nav updateAppOnDisplay={this.updateAppOnDisplay.bind(this)} updateWeb3Params={this.updateWeb3Params}/>
        { <div className="component-wrapper">
            <GetAppToDisplay nfTitle={this.state.nfTitle} account={this.state.account} componentToDisplay={this.state.componentToDisplay}/>
        </div>
        }

      </>
    );
  }


};

export default App;