import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';

import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <Navbar />
        <div className="conteudo-admin">
            <Switch>
                <Route path="/admin/produtos">
                    <h5>Produtos</h5>
                </Route>
                <Route path="/admin/categorias">
                    <h5>Categorias</h5>
                </Route>
                <Route path="/admin/usuarios">
                    <h5>Usuários</h5>
                </Route>
            </Switch>
        </div>
    </div>
);

export default Admin;