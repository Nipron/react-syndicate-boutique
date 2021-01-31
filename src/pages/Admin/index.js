import React, {useState} from 'react';
import './styles.scss';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';

const Admin = props => {
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens')
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('')
    const [ProductImageURL, setProductImageURL] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const handleSubmit = e => {
        e.preventDefault();
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

                        <FormSelect
                            label="Category"
                            options={[{
                                        value: "mens",
                                        name: "Mens"
                                    }, {
                                    value: "womens",
                                    name: "Womens"
                                }]}
                            handleChange={e => setProductCategory(e.target.value)}
                        />

                        <FormInput
                            label="Name"
                            type="text"  //name="productName"
                            value={productName}  //placeholder="Product Name"
                            handleChange={e => setProductName(e.target.value)}
                        />

                        <FormInput
                            label="Main image URL"
                            type="url" //name="ProductImageURL"
                            value={productThumbnail} //placeholder="Product Image URL"
                            handleChange={e => setProductImageURL(e.target.value)}
                        />

                        <FormInput
                            label="Price"
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"  //name="productPrice"
                            value={productPrice}  //placeholder="Price"
                            handleChange={e => setProductPrice(e.target.value)}
                        />

                        <Button type="submit">
                            Add product
                        </Button>

                    </form>
                </div>
            </Modal>

        </div>
    );
}

export default Admin;