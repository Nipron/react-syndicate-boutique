import React, {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './styles.scss';
import {fetchProductStart, setProduct} from "../../redux/Products/products.actions";
import Button from "../forms/Button";
import {addProduct} from "../../redux/Cart/cart.action";

const mapState = state => ({
    product: state.productsData.product
});

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {productID} = useParams();
    const {product} = useSelector(mapState);

    const {
        productName,
        productPrice,
        productThumbnail,
        productDescription
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

    const handleAddToCart = (product) => {
        if (!product) return null;
        dispatch(
            addProduct(product)
        );
        history.push('/cart');
    }

    const configAddToCartBtn = {
        type: 'button'
    }

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} alt={productName}/>
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>{productName}</h1>
                    </li>
                    <li>
                        <span>
                            ₴ {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span dangerouslySetInnerHTML={{__html: productDescription}} />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductCard;
