import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Categoria, ProdutosResponse } from 'core/types/Produto';
import { makeRequest } from 'core/utils/request';
import CardLoaderProduto from './components/loaders/CardLoaderProduto';

import CardProduto from './components/cardProduto';
import Paginacao from 'core/components/paginacao';
import FiltroProduto from 'core/components/filtroProduto';

import './styles.scss'

const Catalogo = () => {
    const [produtosResponse, setProdutosResponse] = useState<ProdutosResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [paginaAtiva, setPaginaAtiva] = useState(0);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState<Categoria>();

    const getProdutos = useCallback(() => {
        const params = {
            pagina: paginaAtiva,
            linhasPorPagina: 12,
            nome,
            idCategoria: categoria?.id
        }

        setIsLoading(true);
        makeRequest({ url: '/produtos', params })
            .then(response => setProdutosResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });

    }, [paginaAtiva, nome, categoria]);

    useEffect(() => {
        getProdutos();
    }, [getProdutos]);

    const handleChangeName = (nome: string) => {
        setPaginaAtiva(0);
        setNome(nome);
    }

    const handleChangeCategoria = (categoria: Categoria) => {
        setPaginaAtiva(0);
        setCategoria(categoria);
    }

    const limparFiltros = () => {
        setPaginaAtiva(0);
        setCategoria(undefined);
        setNome('');
    }
    
    return (
        <div className="catalogo-container">
            <div className="d-flex justify-content-between">
                <h1 className="titulo-catalogo">
                    Catálogo de Produtos
                </h1>
                <FiltroProduto 
                    nome={nome}
                    categoria={categoria}
                    handleChangeCategoria={handleChangeCategoria}
                    handleChangeName={handleChangeName}
                    limparFiltros={limparFiltros}
                />
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