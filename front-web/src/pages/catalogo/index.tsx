import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProdutosResponse } from 'core/types/Produto';
import { makeRequest } from 'core/utils/request';
import CardLoaderProduto from './components/loaders/CardLoaderProduto';

import CardProduto from './components/cardProduto';
import Paginacao from 'core/components/paginacao';
import FiltroProduto, { FormFiltro } from 'core/components/filtroProduto';

import './styles.scss'

const Catalogo = () => {
    const [produtosResponse, setProdutosResponse] = useState<ProdutosResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [paginaAtiva, setPaginaAtiva] = useState(0);

    const getProdutos = useCallback((filtro?: FormFiltro) => {
        const params = {
            pagina: paginaAtiva,
            linhasPorPagina: 12,
            nome: filtro?.nome,
            idCategoria: filtro?.idCategoria
        }

        setIsLoading(true);
        makeRequest({ url: '/produtos', params })
            .then(response => setProdutosResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });

    }, [paginaAtiva]);

    useEffect(() => {
        getProdutos();
    }, [getProdutos]);
    
    return (
        <div className="catalogo-container">
            <div className="d-flex justify-content-between">
                <h1 className="titulo-catalogo">
                    Catálogo de Produtos
                </h1>
                <FiltroProduto onSearch={filtro => getProdutos(filtro)}/>
            </div>

            <div className="catalogo-produtos">
                {isLoading ? <CardLoaderProduto /> : (
                    produtosResponse?.content.map(produto => (
                        <Link to={`/produtos/${produto.id}`} key={produto.id}>
                            <CardProduto produto={produto}/>
                        </Link>
                    ))
                )}
            </div>
            {produtosResponse && (
                <Paginacao 
                    paginaAtiva={paginaAtiva}
                    totalPaginas={produtosResponse.totalPages} 
                    onChange={pagina => setPaginaAtiva(pagina)}
                />
            )}
        </div>
    );
}

export default Catalogo;