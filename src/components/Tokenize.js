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
         estimatedPropertyValue: '',
         errorMsg: '',
         description: '',
         propertyAddress: '',
         activeLease: 'N/A',
         municipality: '',
         schoolZoning: 'Zone A',
         buildingPermits: 'No Active Permits.'

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
                 let estimatedPropertyValue = this.estimatedPropertyValue.value
                 let description = this.description.value
                 let propertyAddress = this.propertyAddress.value
                 let activeLease = this.activeLease.value
                 let municipality = this.municipality.value
                 let schoolZoning = this.schoolZoning.value
                 let buildingPermits = this.buildingPermits.value
                 let tokenURI = this.tokenURI.value
                 this.mintNFT(
                    name,
                    estimatedPropertyValue,
                    this.state.account,
                    description,
                    propertyAddress,
                    activeLease,
                    municipality,
                    schoolZoning,
                    buildingPermits,
                    tokenURI
                )
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
                <FormRow label={"Estimated Property Value:"}
                    child={
                        <input
                            id="estimatedPropertyValue"
                            type="text"
                            name="estimatedPropertyValue"
                            defaultValue={this.state.estimatedPropertyValue}
                            ref={(input) => { this.estimatedPropertyValue = input }}
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
                <FormRow label={"Active Lease:"}
                    child={
                        <input
                            id="activeLease"
                            type="text"
                            name="activeLease"
                            defaultValue={this.state.activeLease}
                            ref={(input) => { this.activeLease = input }}
                        />
                    }
                />
                <FormRow label={"Municipality:"}
                    child={
                        <input
                            id="municipality"
                            type="text"
                            name="municipality"
                            defaultValue={this.state.municipality}
                            ref={(input) => { this.municipality = input }}
                        />
                    }
                />
                <FormRow label={"School Zone "}
                    child={
                        <input
                            id="schoolZoning"
                            type="text"
                            name="schoolZoning"
                            defaultValue={this.state.schoolZoning}
                            ref={(input) => { this.schoolZoning = input }}
                        />
                    }
                />
                <FormRow label={"Building Permits:"}
                    child={
                        <input
                            id="buildingPermits"
                            type="text"
                            name="buildingPermits"
                            defaultValue={this.state.buildingPermits}
                            ref={(input) => { this.buildingPermits = input }}
                        />
                    }
                />
                <FormRow label={"Token URI:"}
                    child={
                        <input
                            id="tokenURI"
                            type="text"
                            name="tokenURI"
                            defaultValue={this.state.tokenURI}
                            ref={(input) => { this.tokenURI = input }}
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
    async mintNFT(
        name,
        estimatedPropertyValue,
        account,
        description,
        propertyAddress,
        activeLease,
        municipality,
        schoolZoning,
        buildingPermits,
        tokenURI
    ) {
          try {
            this.setState({isLoading: true});
            await this.state.nfTitle.methods
                        .requestToMintNewRealEstateToken(
                            name,
                            estimatedPropertyValue,
                            description,
                            propertyAddress,
                            activeLease,
                            municipality,
                            schoolZoning,
                            buildingPermits
                        ).send({from: account})
            this.setState({isLoading:false, success:true});
          } catch(e) {
            this.setState({
                errorMsg: e.message,
                name: name,
                estimatedPropertyValue: estimatedPropertyValue,
                description: description,
                propertyAddress: propertyAddress,
                isLoading:false,
                error: true
            });
            return;
          }
          try {
            tokenId = await this.state.nfTitle.methods.getNumberOfProperties()
            await this.state.nfTitle.methods
                .setTokenURI(
                    tokenId,
                    tokenURI
                ).send({from: account})
          } catch(e) {
            this.setState({errorMsg: e.message,
                name: name,
                estimatedPropertyValue: estimatedPropertyValue,
                description: description,
                propertyAddress: propertyAddress,
                isLoading:false,
                error: true
            });
            return;
          }
    }
}

export default Tokenize;