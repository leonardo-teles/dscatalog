import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg';

import './styles.scss';

type ParamsType = {
    productId: string;
}

const ProductDetails = () => {
    const { productId } = useParams<ParamsType>();
    console.log(productId);

    return(
        <div className="products-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="products-details-goback">
                    <ArrowIcon className="icon-goback"/>
                    <h1 className="text-goback">voltar</h1>
                </Link>
            </div>            
        </div>
    );
};

export default ProductDetails;