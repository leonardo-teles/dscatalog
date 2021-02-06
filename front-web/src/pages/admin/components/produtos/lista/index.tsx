import Paginacao from 'core/components/paginacao';
import { ProdutosResponse } from 'core/types/Produto';
import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../card';

const Lista = () => {
    const [produtosResponse, setProdutosResponse] = useState<ProdutosResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [paginaAtiva, setPaginaAtiva] = useState(0);
    const history = useHistory();

    console.log(produtosResponse);

    useEffect(() => {
        const params = {
            pagina: paginaAtiva,
            linhasPorPagina: 4
        }

        setIsLoading(true);
        makeRequest({ url: '/produtos', params })
            .then(response => setProdutosResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [paginaAtiva]);

    const handleCreate = () => {
        history.push('/admin/produtos/novo');
    }

    return (
        <div className="admin-lista-produtos">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-lista-container">
                {produtosResponse?.content.map(produto => (
                    <Card produto={produto} key={produto.id}/>
                ))}

                {produtosResponse && (
                    <Paginacao 
                        paginaAtiva={paginaAtiva}
                        totalPaginas={produtosResponse.totalPages} 
                        onChange={pagina => setPaginaAtiva(pagina)}
                    />
                )}
            </div>
        </div>
    )
}

export default Lista;