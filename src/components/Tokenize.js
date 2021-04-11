import React, { Component } from 'react';
import './Tokenize.css';
import './Button.css';
import Loading from './Loading.js';
import FormRow from './FormRow.js';
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
         price: '',
         errorMsg: '',
         description: '',
         propertyAddress: ''

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
                         let price = this.price.value
                         let description = this.description.value
                         let propertyAddress = this.propertyAddress.value
                         this.mintNFT(name, price, this.state.account, description, propertyAddress)
                       }}
            >

                <FormRow label={"property name:"}
                    child={<input
                               id="name"
                               type="text"
                               name="name"
                               defaultValue={this.state.name}
                               ref={(input) => { this.name = input }}
                           />}
                />
                <FormRow label={"Price:"}
                    child={
                        <input
                            id="price"
                            type="text"
                            name="price"
                            defaultValue={this.state.price}
                            ref={(input) => { this.price = input }}
                        />
                    }
                />
                <FormRow label={"Property Description:"}
                    child={
                        <input
                            id="description"
                            type="text"
                            name="description"
                            defaultValue={this.state.description}
                            ref={(input) => { this.description = input }}
                        />
                    }
                />
                <FormRow label={"Property Address:"}
                    child={
                        <input
                            id="propertyAddress"
                            type="text"
                            name="propertyAddress"
                            defaultValue={this.state.propertyAddress}
                            ref={(input) => { this.propertyAddress = input }}
                        />
                    }
                />
                <ul>
                <li className="form-row">
                    <button className="submit button" >submit </button>
                    </li>
                </ul>

            </form>}
            </div>
        )
    }
    async mintNFT(name, price, account, description, propertyAddress) {
          try {
            this.setState({isLoading: true});
            await this.state.nfTitle.methods.requestToMintNewRealEstateToken(name, price, description, propertyAddress).send({from: account})
            this.setState({isLoading:false, success:true});
          } catch(e) {

            this.setState({errorMsg: e.message, name: name, price: price, description: description, propertyAddress: propertyAddress, isLoading:false, error: true});
          }
    }
}

export default Tokenize;