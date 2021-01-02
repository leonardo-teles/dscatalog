import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProdutosResponse } from 'core/types/Produto';
import { makeRequest } from 'core/utils/request';
import CardLoaderProduto from './components/loaders/CardLoaderProduto';

import CardProduto from './components/cardProduto';
import Paginacao from 'core/components/paginacao';
import './styles.scss'

const Catalogo = () => {
    const [produtosResponse, setProdutosResponse] = useState<ProdutosResponse>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = {
            pagina: 0,
            linhasPorPagina: 12
        }

        setIsLoading(true);
        makeRequest({ url: '/produtos', params })
            .then(response => setProdutosResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    
    return (
        <div className="catalogo-container">
            <h1 className="titulo-catalogo">
                Catálogo de Produtos
            </h1>
            <div className="catalogo-produtos">
                {isLoading ? <CardLoaderProduto/> : (
                    produtosResponse?.content.map(produto => (
                        <Link to={`/produtos/${produto.id}`} key={produto.id}>
                            <CardProduto produto={produto}/>
                        </Link>
                    ))
                )}
            </div>
            <Paginacao />
        </div>
    );
}

export default Catalogo;