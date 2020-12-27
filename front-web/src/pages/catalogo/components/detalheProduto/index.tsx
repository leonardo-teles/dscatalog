import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/imagens/arrow.svg'
import PrecoProduto from '../../../../core/components/precoProduto';
import { Produto } from '../../../../core/types/Produto';
import { makeRequest } from '../../../../core/utils/request';
import LoaderDescricaoProduto from '../loaders/LoaderDescricaoProduto';
import LoaderInformacaoProduto from '../loaders/LoaderInformacaoProduto';
import './styles.scss';

type ParamsType = {
    idProduto: string;
}

const DetalheProduto = () => {
    const { idProduto } = useParams<ParamsType>();
    const [produto, setProduto] = useState<Produto>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        makeRequest({ url: `/produtos/${idProduto}` })
            .then(response => setProduto(response.data))
            .finally(() => setIsLoading(false));

    }, [idProduto]);

    return (
        <div className="detalhe-produto-container">
            <div className="card-base border-radius-20 detalhe-produto">
                <Link to="/produtos" className="link-detalhe-produto">
                    <ArrowIcon className="icone-voltar"/>
                    <h1 className="texto-voltar">voltar</h1>               
                </Link>
                <div className="row">
                    <div className="col-6 pr-5">
                        {isLoading ? <LoaderInformacaoProduto/> : (
                            <>
                                <div className="card-detalhe-produto text-center">
                                    <img src={produto?.imgUrl} alt={produto?.nome} className="imagem-detalhe-produto"/>
                                </div>
                                <h1 className="nome-detalhe-produto">
                                    {produto?.nome}
                                </h1>
                                { produto?.preco && <PrecoProduto preco={produto?.preco}/> }
                            </>
                        )}
                    </div>
                    <div className="col-6 card-detalhe-produto">
                        {isLoading ? <LoaderDescricaoProduto/> : (
                            <>
                                <h1 className="titulo-descricao-produto">Descrição do Produto</h1>
                                <p className="text-descricao-produto">
                                    {produto?.descricao}
                                </p>
                            </>
                        )}    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalheProduto;