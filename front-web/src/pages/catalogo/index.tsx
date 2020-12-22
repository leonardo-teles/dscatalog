import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../core/utils/request';

import CardProduto from './components/cardProduto';
import './styles.scss'

const Catalogo = () => {
    //quando a lista de produtos estiver disponível, popular um estado no componente e listar os produtos dinâmicamente
    
    //quando o componente iniciar, buscar a lista de produtos
    useEffect(() => {
        const params = {
            pagina: 0,
            linhasPorPagina: 12
        }

        makeRequest({ url: '/produtos', params })
            .then(response => console.log(response));
    }, []);
    
    return (
        <div className="catalogo-container">
            <h1 className="titulo-catalogo">
                Catálogo de Produtos
            </h1>
            <div className="catalogo-produtos">
                <Link to="/produtos/1"><CardProduto/></Link>
                <Link to="/produtos/2"><CardProduto/></Link>
                <Link to="/produtos/3"><CardProduto/></Link>
                <Link to="/produtos/4"><CardProduto/></Link>
                <Link to="/produtos/5"><CardProduto/></Link>
                <Link to="/produtos/6"><CardProduto/></Link>
                <Link to="/produtos/7"><CardProduto/></Link>
                <Link to="/produtos/8"><CardProduto/></Link>
                <Link to="/produtos/9"><CardProduto/></Link>
                <Link to="/produtos/10"><CardProduto/></Link>
                <Link to="/produtos/11"><CardProduto/></Link>
                <Link to="/produtos/12"><CardProduto/></Link>
    
            </div>
        </div>
    );
}

export default Catalogo;