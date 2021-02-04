import React from 'react';
import Button from "../../forms/Button";
import s from './Product.module.scss';
import {Link} from "react-router-dom";

const Product = ({
                     documentID,
                     productName,
                     productPrice,
                     productThumbnail,
                     productCategory
                 }) => {

    if (!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined') return null;

    const configAddToCartButton = {
        type: 'button'
    }

    return (
        <div className="product">
            <div className={s.card}>
                <div className={s.content}>
                    <div className="thumb">
                        <Link to={`/product/${documentID}`}>
                            <img src={productThumbnail} alt={productName}/>
                        </Link>
                    </div>

                    <div className="details">
                        <Link to={`/product/${documentID}`}>
                            {productName}
                        </Link>
                        ₴ {productPrice}

                        <Button {...configAddToCartButton}>
                            Add to Cart
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;


/*
<div className="thumb">
    <img src={productThumbnail} alt={productName}/>
</div>

<div className="details">
    <ul>
        <li>
            <span className="name">
                {productName}
            </span>
        </li>
        <li>
            <span className="price">
                ₴ {productPrice}
            </span>
        </li>
        <li>
            <div className="addToCart">
                <Button {...configAddToCartButton}>
                    Add to Cart
                </Button>
            </div>
        </li>
    </ul>
</div>
*/
