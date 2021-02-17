import Paginacao from 'core/components/paginacao';
import { ProdutosResponse } from 'core/types/Produto';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../card';
import CardLoader from '../loader/CardLoaderProduto';

const Lista = () => {
    const [produtosResponse, setProdutosResponse] = useState<ProdutosResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [paginaAtiva, setPaginaAtiva] = useState(0);
    const history = useHistory();

    const getProdutos = useCallback(() => {
        const params = {
            pagina: paginaAtiva,
            linhasPorPagina: 4,
            direcaoOrdenacao: 'DESC',
            ordenarPor: 'id'
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

    const handleCreate = () => {
        history.push('/admin/produtos/novo');
    }

    const onRemove = (idProduto: number) => {
        const confirmacao = window.confirm('Deseja excluir este produto?');

        if(confirmacao) {
            makePrivateRequest({ url: `/produtos/${idProduto}`, method: 'DELETE' })
             .then(() => {
                toast.info('Produto removido com sucesso');
                getProdutos();
             })
             .catch(() => {
                toast.error('Erro ao remover produto');
             });        
        }
    }

    return (
        <div className="admin-lista-produtos">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-lista-container">
                {isLoading ? <CardLoader /> : (
                    produtosResponse?.content.map(produto => (
                        <Card produto={produto} key={produto.id} onRemove={onRemove}/>
                    ))
                )}
                {produtosResponse && (
                    <Paginacao 
                        totalPaginas={produtosResponse.totalPages} 
                        onChange={pagina => setPaginaAtiva(pagina)}
                    />
                )}
            </div>
        </div>
    )
}

export default Lista;