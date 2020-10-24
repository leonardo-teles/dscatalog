import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/imagens/arrow.svg'
import './styles.scss';

type ParamsType = {
    idProduto: string;
}

const DetalheProduto = () => {
    const { idProduto } = useParams<ParamsType>();

    console.log(idProduto);

    return (
        <div className="detalhe-produto-container">
            <div className="card-base border-radius-20 detalhe-produto">
                <Link to="/produtos" className="link-detalhe-produto">
                    <ArrowIcon className="icone-voltar"/>
                    <h1 className="texto-voltar">voltar</h1>               
                </Link>
            </div>
        </div>
    );
};

export default DetalheProduto;