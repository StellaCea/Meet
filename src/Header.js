import React, { Component } from 'react';
import logo from "./meet-logo.png";

class Header extends Component {
    render() {
    return (
        <header className='header-container'>
        <img className='meet-app-icon' src={logo} alt='Meet App Logo' />
        </header>
    );
    }
};

export default Header;