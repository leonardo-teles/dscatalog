import React from 'react';
import { ReactComponent as ProdutoImage } from '../../../../core/assets/imagens/produtos.svg';
import PrecoProduto from '../../../../core/components/precoProduto';
import './styles.scss';

const CardProduto = () => (
    <div className="card-base border-radius-10 card-produto">
        <ProdutoImage />
        <div className="info-produto">
            <h6 className="nome-produto">
                Computador Desktop - Intel Core i7
            </h6>
            <PrecoProduto preco="2.779,00"/>
        </div>
    </div>
);

export default CardProduto;