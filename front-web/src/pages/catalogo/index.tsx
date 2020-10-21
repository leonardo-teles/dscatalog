import React from 'react';
import CardProduto from './components/cardProduto';
import './styles.scss'

const Catalogo = () => (
    <div className="catalogo-container">
        <h1 className="titulo-catalogo">
            Catálogo de Produtos
        </h1>
        <div className="catalogo-produtos">
            <CardProduto/>
            <CardProduto/>
            <CardProduto/>
            <CardProduto/>
            <CardProduto/><CardProduto/>
            <CardProduto/>
            <CardProduto/>
            <CardProduto/>
            <CardProduto/>
            <CardProduto/><CardProduto/>

        </div>
    </div>
);

export default Catalogo;