import React from 'react';
import { ReactComponent as AuthImage }  from 'core/assets/imagens/auth.svg';

import './styles.scss';

const Auth = () => (
    <div className="auth-container">
        <div className="auth-info">
            <h1 className="titulo-auth-info">
                Divulgue seus produtos <br/> no DS Catalog
            </h1>
            <p className="subtitulo-auth-info">
                Faça parte do nosso catálogo de divulgação e <br/> aumente a venda dos seus produtos.
            </p>
            <AuthImage />
        </div>
        <div className="conteudo-auth">
            <h3>Formulário</h3>
        </div>
    </div>
);

export default Auth;