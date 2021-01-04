import React from 'react';
import ShopMen from '../../assets/MenHome.jpg';
import ShopWomen from '../../assets/LadiesHome3.jpg';
import './styles.scss';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${ShopWomen})`
                    }}><a>Shop Ladies2</a>
                </div>
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${ShopMen})`
                    }}><a>Shop Men</a>
                </div>
            </div>
        </div>
    );
};

export default Directory;
