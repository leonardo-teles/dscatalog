import React from 'react';
import { ReactComponent as ProdutoImage } from '../../../../core/assets/imagens/produtos.svg'
import './styles.scss'

const CardProduto = () => (
    <div className="card-base border-radius-10 card-produto">
        <ProdutoImage />
        <div className="info-produto">
            <h6 className="nome-produto">
                Computador Desktop - Intel Core i7
            </h6>
            <div className="preco-produto-container">
                <span className="moeda">R$</span>
                <h3 className="preco-produto">2.779,00</h3>
            </div>
        </div>
    </div>
);

export default CardProduto;