import React from 'react';
import './styles.scss';

type Props = {
    preco: number;
}

const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(preco)
}

const PrecoProduto = ({ preco }: Props) => (

    <div className="preco-produto-container">
        <span className="moeda">R$</span>
        <h3 className="preco-produto">{formatarPreco(preco)}</h3>
    </div>

);

export default PrecoProduto;