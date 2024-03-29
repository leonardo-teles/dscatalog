import React from 'react';
import { Route, Switch } from 'react-router';
import Navbar from './components/Navbar';
import Products from './components/Products';

import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <Navbar />
        <div className="admin-content">
            <Switch>
                <Route path="/admin/products">
                    <Products />
                </Route>

                <Route path="/admin/categories">
                    <h4>Categorias</h4>
                </Route>
                <Route path="/admin/users">
                    <h4>Usuários</h4>
                </Route>
            </Switch>
        </div>
    </div>
);

export default Admin;