import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/imagens/arrow.svg'
import { Editor } from "react-draft-wysiwyg";
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';

import PrecoProduto from 'core/components/precoProduto';
import { Produto } from 'core/types/Produto';
import { makeRequest } from 'core/utils/request';

import LoaderDescricaoProduto from '../loaders/LoaderDescricaoProduto';
import LoaderInformacaoProduto from '../loaders/LoaderInformacaoProduto';

import './styles.scss';

type ParamsType = {
    idProduto: string;
}

const DetalheProduto = () => {
    const { idProduto } = useParams<ParamsType>();
    const [produto, setProduto] = useState<Produto>();
    const [isLoading, setIsLoading] = useState(false);
    const estadoDoConteudo = stateFromHTML(produto?.descricao || '');
    const estadoDaDescricao = EditorState.createWithContent(estadoDoConteudo);


    useEffect(() => {
        setIsLoading(true);
        makeRequest({ url: `/produtos/${idProduto}` })
            .then(response => setProduto(response.data))
            .finally(() => setIsLoading(false));

    }, [idProduto]);

    return (
        <div className="detalhe-produto-container">
            <div className="card-base border-radius-20 detalhe-produto">
                <Link to="/produtos" className="link-detalhe-produto">
                    <ArrowIcon className="icone-voltar"/>
                    <h1 className="texto-voltar">voltar</h1>               
                </Link>
                <div className="info-detalhes-produto">                
                    {isLoading ? <LoaderInformacaoProduto/> : (
                        <>
                            <div className="card-detalhe-produto text-center">
                                <img src={produto?.imgUrl} alt={produto?.nome} className="imagem-detalhe-produto"/>
                            </div>
                            <div className="campos-info-produto">
                                <h1 className="nome-detalhe-produto">
                                    {produto?.nome}
                                </h1>
                                { produto?.preco && <PrecoProduto preco={produto?.preco}/> }
                            </div>
                        </>
                    )}                    
                    <div className="card-detalhe-produto">
                        {isLoading ? <LoaderDescricaoProduto/> : (
                            <>
                                <h1 className="titulo-descricao-produto">Descri????o do Produto</h1>
                                <Editor
                                    editorClassName="text-descricao-produto"
                                    editorState={estadoDaDescricao}
                                    toolbarHidden
                                    readOnly                                    
                                />                                
                            </>                            
                        )}    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalheProduto;