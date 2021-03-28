import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
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
                </ul>
            </header>
        )
    }
}
export default Nav;