import React, { Component } from 'react';
import Hero from './Hero.js';
import Tokenize from './Tokenize.js';
class GetAppToDisplay extends Component {
    constructor(props) {
      super(props)
    }
    render() {
        switch(this.props.componentToDisplay) {
          case 'tokenize':
            return <Tokenize account={this.props.account} nfTitle={this.props.nfTitle}/>;
          default:
            return <Hero/>
        }
    }
}

export default GetAppToDisplay;