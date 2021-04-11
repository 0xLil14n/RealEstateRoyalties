import React, { Component } from 'react';
import './Tokenize.css';
class FormRow extends Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }
    render() {
        return(
              <ul className="wrapper">
                  <li className="form-row">
                      <label className="form-item">{this.props.label}</label >
                      {this.props.child}
                  </li>
              </ul>
        )
    }
}

export default FormRow;