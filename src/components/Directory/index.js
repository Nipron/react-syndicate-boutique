import React from 'react';
import ShopMen from '../../assets/MenHome.jpg';
import ShopWomen from '../../assets/LadiesHome3.jpg';
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
                            backgroundImage: `url(${ShopWomen})`
                        }}><a>Shop Ladies</a>
                    </div>
                </Link>
                <Link to="/search/mens">
                    <div
                        className="item"
                        style={{
                            backgroundImage: `url(${ShopMen})`
                        }}><a>Shop Men</a>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Directory;
