import React, { Component } from 'react';
import './Nav.css';
import Web3 from 'web3';
class Nav extends Component {
async componentWillMount() {
        await this.setShowWeb3(this.props.dispatch)
      }
async connectToWeb3(e){
        e.preventDefault()

        try {
            console.log('connecting to web3...');
            let self = this;
            window.ethereum.enable().then(async function () {
                const web3 = new Web3(ethereum)

                const accounts = await web3.eth.getAccounts()

                const balance = await web3.eth.getBalance(accounts[0])

                self.setState({showConnectToWeb3: false, account: accounts[0], balance: balance, web3: web3})

            // User has allowed account access to DApp...
            });

        } catch (e) {
            // User has denied account access to DApp...
        }
    }

      async setShowWeb3(dispatch) {

        //check if MetaMask exists
        const web3 = new Web3(ethereum)
        if( web3 !== 'undefined'){
            const accounts = await web3.eth.getAccounts()
            console.log('accountslength: ', accounts.length)
            this.setState({showConnectToWeb3: accounts.length == 0});

        }

      }
      constructor(props) {
              super(props)
              this.state = {
                web3: 'undefined',
                account: '',
                showConnectToWeb3: false
              }
          }
    render(){
        return(
            <header class="header">
            <a class="logo" href="">
                🏠Real Estate Royalties
            </a>
                <input class="menu-btn" type="checkbox" id="menu-btn" />
                    <label class="menu-icon" for="menu-btn">
                        <span class="navicon"></span>
                    </label>
                <ul class="menu">
                    <li><a href="#docs">Docs</a></li>
                    <li><a href="#mint">Tokenize</a></li>
                    <li>{this.state.showConnectToWeb3 &&
                                        <button onClick={(e) => this.connectToWeb3(e)} class="button w-button">Connect To Web3</button>}</li>
                </ul>
            </header>
        )
    }
}
export default Nav;