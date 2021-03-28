import React, { Component } from 'react';
import Web3 from 'web3';
class Hero extends Component {
    async componentWillMount() {
        await this.setShowWeb3(this.props.dispatch)
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
    async handleChangedAccount(accounts){
        this.setState({showConnectToWeb3: accounts.length == 0});
    }
    async connectToWeb3(e){
        e.preventDefault()
        try {
            console.log('connecting to web3...');
            let self = this;
            window.ethereum.enable().then(async function () {
                const web3 = new Web3(ethereum)

                const accounts = await web3.eth.getAccounts()
                console.log('account[]: ', accounts);


                console.log('account[0]: ', accounts[0]);
                const balance = await web3.eth.getBalance(accounts[0])

                self.setState({showConnectToWeb3: false, account: accounts[0], balance: balance, web3: web3})

            // User has allowed account access to DApp...
            });

        } catch (e) {
            // User has denied account access to DApp...
        }
    }
    render() {
    console.log('connectoToewj23,', this.state.showConnectToWeb3)
        return(
            <div className="container-fluid mt-5 text-center">
              <h1 class="hero">Welcome to RealEstate Royalties</h1>

                {this.state.showConnectToWeb3 &&
                <button onClick={(e) => this.connectToWeb3(e)} class="button w-button">Connect To Web3</button>}
            </div>
        )
    }
}

export default Hero;