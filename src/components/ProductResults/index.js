import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './styles.scss';
import {fetchProductsStart} from "../../redux/Products/products.actions";
import Product from "./Product";

const mapState = ({productsData}) => ({
    products: productsData.products
})

const ProductResults = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(mapState);

    useEffect(() => {
        dispatch(fetchProductsStart())
    }, []);

    if (!Array.isArray(products)) return null;

    if (products.length < 1) {
        return (
            <div className="products">
                <p>
                    No Search Results
                </p>
            </div>
        )
    }

    return (
        <div className="products">

            <h1>
                Browse Products
            </h1>

            <div className="productsResults">
                    {products.map((product, pos) => <Product key={pos} {...product}/>)}
            </div>
        </div>
    );
};

export default ProductResults;
