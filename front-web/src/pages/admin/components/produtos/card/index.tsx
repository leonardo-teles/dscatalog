import React from 'react';
import PrecoProduto from 'core/components/precoProduto';
import { Produto } from 'core/types/Produto';
import { Link } from 'react-router-dom';

import './styles.scss';

type Props = {
    produto: Produto;
    onRemove: (idProduto: number) => void;
}

const Card = ({ produto, onRemove }: Props) => {
    return (
        <div className="card-base admin-card-produto">
            <div className="text-center border-right py-3 borda-imagem">
                    <img src={produto.imgUrl}
                         alt={produto.nome}
                         className="admin-imagem-card-produto"/>
                </div>
                <div className="conteudo-card">
                    <h3 className="admin-nome-produto-card">
                        {produto.nome}
                    </h3>
                    <PrecoProduto preco={produto.preco} />
                    <div>
                        <span className="badge badge-pill badge-secondary mr-2">
                            Categoria 1
                        </span>

                        <span className="badge badge-pill badge-secondary mr-2">
                            Categoria 2
                        </span>
                    </div>
                </div>
                <div className="btn-container">
                    <Link to={`/admin/produtos/${produto.id}`}
                        type="button" 
                        className="btn btn-outline-secondary btn-block border-radius-10 btn-produto">
                        EDITAR
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-outline-danger btn-block border-radius-10 btn-produto"
                        onClick={() => onRemove(produto.id)} >
                        EXCLUIR
                    </button>
            </div>            
        </div>
    )
}

export default Card;