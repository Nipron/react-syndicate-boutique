import React from 'react';
import './styles.scss';
import Logo from '../../assets/syndboutique.png'

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <img src={Logo} alt="Syndicate Boutique Logo" />
                </div>
            </div>
        </header>
    );
};

export default Header;
