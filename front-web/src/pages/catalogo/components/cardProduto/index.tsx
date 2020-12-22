import React from 'react';
import PrecoProduto from '../../../../core/components/precoProduto';
import { Produto } from '../../../../core/types/Produto';
import './styles.scss';

type Props = {
    produto: Produto;
}

const CardProduto = ({ produto }: Props) => (
    <div className="card-base border-radius-10 card-produto">
        <img src={produto.imgUrl} alt={produto.nome} className="imagem-card-produto"/>
        <div className="info-produto">
            <h6 className="nome-produto">
                {produto.nome}
            </h6>
            <PrecoProduto preco={produto.preco}/>
        </div>
    </div>
);

export default CardProduto;