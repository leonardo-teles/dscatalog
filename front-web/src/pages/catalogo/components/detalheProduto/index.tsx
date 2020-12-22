import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/imagens/arrow.svg'
import { ReactComponent as ProdutoImage } from '../../../../core/assets/imagens/produtos.svg'
import './styles.scss';

type ParamsType = {
    idProduto: string;
}

const DetalheProduto = () => {
    const { idProduto } = useParams<ParamsType>();

    console.log(idProduto);

    return (
        <div className="detalhe-produto-container">
            <div className="card-base border-radius-20 detalhe-produto">
                <Link to="/produtos" className="link-detalhe-produto">
                    <ArrowIcon className="icone-voltar"/>
                    <h1 className="texto-voltar">voltar</h1>               
                </Link>
                <div className="row">
                    <div className="col-6 pr-5">
                        <div className="card-detalhe-produto text-center">
                            <ProdutoImage className="imagem-detalhe-produto"/>
                        </div>
                        <h1 className="nome-detalhe-produto">
                            Computador Desktop - Intel Core i7
                        </h1>
                    </div>
                    <div className="col-6 card-detalhe-produto">
                        <h1 className="titulo-descricao-produto">Descrição do Produto</h1>

                        <p className="text-descricao-produto">
                            Seja um mestre em multitarefas com a capacidade para exibir quatro
                            aplicativos simultâneos na tela. A tela está ficando abarrotada?
                            Crie áreas de trabalho virtuais para obter mais espaço e trabalhe
                            com os itens que você deseja. Além disso, todas as notificações e 
                            principais configurações são reunidas em uma única tela de fácil acesso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalheProduto;