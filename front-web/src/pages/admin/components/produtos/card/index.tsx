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
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    <img src={produto.imgUrl}
                         alt={produto.nome}
                         className="admin-imagem-card-produto"/>
                </div>
                <div className="col-7 py-3">
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
                <div className="col-3 pt-3 pr-5">
                    <Link to={`/admin/produtos/${produto.id}`}
                        type="button" 
                        className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edicao">
                        EDITAR
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-outline-danger btn-block border-radius-10"
                        onClick={() => onRemove(produto.id)} >
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;