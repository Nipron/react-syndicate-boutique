import React from 'react';
import './styles.scss';
import Logo from '../../assets/syndboutique.png';
import {Link} from 'react-router-dom';

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Syndicate Boutique Logo"/>
                    </Link>
                </div>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="registration">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
