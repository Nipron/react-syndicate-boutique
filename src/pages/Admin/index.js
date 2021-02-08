import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import {addProductStart, deleteProductStart, fetchProductsStart} from "../../redux/Products/products.actions";
import LoadMore from "../../components/LoadMore";
import CKEditor from 'ckeditor4-react';
import './styles.scss';

const mapState = ({productsData}) => ({
    products: productsData.products
});

const Admin = props => {
    const {products} = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens')
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productFile, setProductFile] = useState(null);
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState('');
    const [productFileNameDate, setProductFileNameDate] = useState('');

    const {data, queryDoc, isLastPage} = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );

    }, [])

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('mens');
        setProductName('');
        setProductThumbnail('');
        setProductFile(null);
        setProductPrice(0);
        setProductDescription('');
        setProductFileNameDate('')
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(
            addProductStart({
                    productCategory,
                    productName,
                    productThumbnail,
                    productPrice,
                    productDescription,
                    productFile,
                    productFileNameDate
                }
            )
        );
        resetForm();
    };

    const handleLoadMore = () => {
        dispatch(fetchProductsStart({
            startAfterDoc: queryDoc,
            persistProducts: data
        }))
    }

    const handleSetFile = files => setProductFile(files[0])

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    };

    return (
        <div className="admin">
            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Add new product
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>

                        <h2>
                            Add new product
                        </h2>

                        <label>Category</label>

                        <FormSelect
                            //label="Category"
                            options={[{
                                value: "mens",
                                name: "Mens"
                            }, {
                                value: "womens",
                                name: "Womens"
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}
                        />

                        <label>Name</label>

                        <FormInput
                            //label="Name"
                            type="text"  //name="productName"
                            value={productName}  //placeholder="Product Name"
                            handleChange={e => setProductName(e.target.value)}
                        />

                        {/*      IN CASE WE NEED TO UPLOAD PICS BY URL

                        <label>Main image URL</label>

                        <FormInput
                            // label="Main image URL"
                            type="url" //name="ProductImageURL"
                            value={productThumbnail} //placeholder="Product Image URL"
                            handleChange={e => setProductThumbnail(e.target.value)}
                        />*/}

                        <label>Upload</label>

                        <FormInput
                            // label="Main image URL"
                            type="file" //name="ProductImageURL"
                           //value={productThumbnail} //placeholder="Product Image URL"
                            onChange={(e) => handleSetFile(e.target.files)}
                        />

                        {/* <input type="file" onChange={(e) => handleSetFile(e.target.files)}/> */}

                        <label>Price</label>

                        <FormInput
                            //label="Price"
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"  //name="productPrice"
                            value={productPrice}  //placeholder="Price"
                            handleChange={e => setProductPrice(e.target.value)}
                        />

                        <label>Description</label>

                        <br/>

                        <CKEditor onChange={evt => setProductDescription(evt.editor.getData())}/>

                        <br/>

                        <Button type="submit">
                            Add product
                        </Button>

                    </form>
                </div>
            </Modal>

            <div className="manageProducts">

                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                    <tr>
                        <th>
                            <h1>
                                Manage Products
                            </h1>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                <tbody>
                                {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                                    const {
                                        productName,
                                        productThumbnail,
                                        productPrice,
                                        documentID
                                    } = product;

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img className="thumb" src={productThumbnail}/>
                                            </td>
                                            <td>
                                                {productName}
                                            </td>
                                            <td>
                                                ₴{productPrice}
                                            </td>
                                            <td>
                                                <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellspacing="10" cellSpacing="0">
                                <tbody>
                                <tr>
                                    <td>
                                        {!isLastPage && <LoadMore {...configLoadMore}/>}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Admin;