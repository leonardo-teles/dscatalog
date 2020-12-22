import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProdutosResponse } from '../../core/types/Produto';
import { makeRequest } from '../../core/utils/request';

import CardProduto from './components/cardProduto';
import './styles.scss'

const Catalogo = () => {
    const [produtosResponse, setProdutosResponse] = useState<ProdutosResponse>();

    useEffect(() => {
        const params = {
            pagina: 0,
            linhasPorPagina: 12
        }

        makeRequest({ url: '/produtos', params })
            .then(response => setProdutosResponse(response.data));
    }, []);
    
    return (
        <div className="catalogo-container">
            <h1 className="titulo-catalogo">
                Catálogo de Produtos
            </h1>
            <div className="catalogo-produtos">
                {
                    produtosResponse?.content.map(produto => (
                        <Link to="/produtos/1" key={produto.id}>
                            <CardProduto produto={produto}/>
                        </Link>
                    ))
                }    
            </div>
        </div>
    );
}

export default Catalogo;