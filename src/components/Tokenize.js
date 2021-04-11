import React, { Component } from 'react';
import './Tokenize.css';
import './Button.css';
import Loading from './Loading.js';
class Tokenize extends Component {
    constructor(props) {
      super(props)
      this.state = {
        account: this.props.account,
         success: false,
         error: false,
         nfTitle: this.props.nfTitle,
         isLoading: false,
         name:'',
         userProvidedSeed: '',
         errorMsg: ''

      }
    }
    render() {
        return(
            <div className="tokenize-padding-top">
              <h2>Tokenize</h2>
            {!this.state.isLoading &&<dl className="lowerCase">Mint your NFT Title here.</dl>}
            {this.state.success && <h2 className="success">NFTitle created successfully!</h2>}

            {this.state.error && <p className="error">Error minting your NFTitle: {this.state.errorMsg}</p>}
            {this.state.isLoading &&<Loading/>}
            {!this.state.isLoading && <form onSubmit={(e) => {
                         e.preventDefault()
                         let name = this.name.value
                         let userProvidedSeed = this.userProvidedSeed.value

                         this.mintNFT(name, userProvidedSeed, this.state.account)
                       }}
            >
                <ul className="wrapper">
                    <li className="form-row">
                        <label className="form-item">Name:</label >
                          <input
                                id="name"
                                type="text"
                                name="name"
                                defaultValue={this.state.name}
                                ref={(input) => { this.name = input }}
                            />
                    </li>
                </ul>
                <ul className="wrapper">
                    <li className="form-row">
                        <label className="form-item">Seed:</label >
                              <input
                                id="userProvidedSeed"
                                type="text"
                                name="userProvidedSeed"
                                defaultValue={this.state.userProvidedSeed}
                                ref={(input) => { this.userProvidedSeed = input }}
                            />
                    </li>
                </ul>
                <ul className="wrapper">
                    <li className="form-row">
                        <button className="submit button" >submit </button>
                    </li>
                </ul>
            </form>}
            </div>
        )
    }
    async mintNFT(name, userProvidedSeed, account) {
          try {
            console.log('trying to mint 22222 account', account);
            this.setState({isLoading: true});
            await this.state.nfTitle.methods.requestToMintNewRealEstateToken(name, userProvidedSeed).send({from: account})
            this.setState({isLoading:false, success:true});
          } catch(e) {
            console.log('error minting token', e);
            this.setState({errorMsg: e.message, name: name, userProvidedSeed: userProvidedSeed, isLoading:false, error: true});
          }

          console.log('minting NFT...');
    }
}

export default Tokenize;