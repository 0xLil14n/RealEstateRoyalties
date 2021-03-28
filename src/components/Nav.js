import React, { Component } from 'react';
//import { Tabs, Tab } from 'react-bootstrap'
import './App.css';
class Nav extends Component {
    render() {
        return(
            <div className="padding-nav topnav navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <nav className="topnav navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">

                  <div
                    className="nav-links navbar-brand  "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>🏠💵</span>
                    <b>RealEstate Royalites</b>
                    <span>🏠💵</span>
                </div>
                <span class="nav-links-container">
                    <a className="topnav nav-links   "> Home</a>
                    <a className="topnav nav-links  "> Docs</a>
                    <a className="topnav nav-links  "> How To</a>
                </span>

            </nav>
            </div>
        )
    }
}
export default Nav;