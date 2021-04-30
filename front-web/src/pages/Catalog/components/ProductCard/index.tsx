import React from 'react';

import ProductPrice from '../../../../core/components/ProductPrice';
import { ReactComponent as ProductImage } from '../../../../core/assets/images/product.svg';

import './styles.scss';

const ProductCard = () => (
    <div className="card-base border-radius-10 product-card">
        <ProductImage />

        <div className="product-info">
            <h6 className="product-name">
                Computador Desktop - Intel Core i7
            </h6>
            <ProductPrice price="2.799,00"/>
        </div>
    </div>

);

export default ProductCard;