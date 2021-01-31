import React from 'react';
import { Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Produtos from './components/produtos';
import PrivateRoute from 'core/components/rotas/privateRoute';

import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <Navbar />
        <div className="conteudo-admin">
            <Switch>
                <PrivateRoute path="/admin/produtos">
                    <Produtos />
                </PrivateRoute>
                <PrivateRoute path="/admin/categorias">
                    <h5>Categorias</h5>
                </PrivateRoute>
                <PrivateRoute path="/admin/usuarios" allowedRoutes={['ROLE_ADMIN']}>
                    <h5>Usuários</h5>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;