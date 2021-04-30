import React from 'react';
import { useParams } from 'react-router-dom';


type ParamsType = {
    productId: string;
}

const ProductDetails = () => {
    const { productId } = useParams<ParamsType>();
    console.log(productId);

    return(
        <div className="products-details-container">
            <h1>detalhes do produto</h1>
        </div>
    );
};

export default ProductDetails;