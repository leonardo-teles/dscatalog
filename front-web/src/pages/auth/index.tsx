import React from 'react';
import { ReactComponent as AuthImage }  from 'core/assets/imagens/auth.svg';
import { Route, Switch } from 'react-router-dom';
import Login from './components/login';

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
            <Switch>
                <Route path="/admin/auth/login">
                    <Login />                        
                </Route>
                <Route path="/admin/auth/cadastro">
                    <h5>Cadastro</h5>
                </Route>
                <Route path="/admin/auth/recuperar">
                    <h5>Recuperar Senha</h5>
                </Route>
            </Switch>
            
        </div>
    </div>
);

export default Auth;