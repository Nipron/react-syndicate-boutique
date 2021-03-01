import React from 'react';
import forher from '../../assets/forher.jpg';
import forhim from '../../assets/forhim.jpg';
import './styles.scss';
import {Link} from "react-router-dom";

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <Link to="/search/womens">
                    <div
                        className="item"
                        style={{
                            backgroundImage: `url(${forher})`
                        }}><a>FOR HER</a>
                    </div>
                </Link>
                <Link to="/search/mens">
                    <div
                        className="item"
                        style={{
                            backgroundImage: `url(${forhim})`
                        }}><a>FOR HIM</a>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Directory;
