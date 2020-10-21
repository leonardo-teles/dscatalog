import React from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';

type ParamsType = {
    idProduto: string;
}

const DetalheProduto = () => {
    const { idProduto } = useParams<ParamsType>();

    console.log(idProduto);

    return (
        <div className="detalhe-produto-container">
            <div className="card-base">
                <h1>Detalhes do Produto</h1>
            </div>
        </div>
    );
};

export default DetalheProduto;