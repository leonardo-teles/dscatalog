import { type } from 'os';
import React from 'react';
import './styles.scss';

type Props = {
    preco: string;
}

const PrecoProduto = ({ preco }: Props) => (

    <div className="preco-produto-container">
        <span className="moeda">R$</span>
        <h3 className="preco-produto">{preco}</h3>
    </div>

);

export default PrecoProduto;