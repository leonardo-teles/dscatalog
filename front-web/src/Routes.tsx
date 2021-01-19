import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/components/navbar';
import Admin from './pages/admin';
import Catalogo from './pages/catalogo';
import DetalheProduto from './pages/catalogo/components/detalheProduto';
import Home from './pages/home';
import Auth from './pages/auth';

const Routes = () => (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>
            <Route path="/produtos" exact>
                <Catalogo/>
            </Route>
            <Route path="/produtos/:idProduto">
                <DetalheProduto/>
            </Route>
            <Redirect from="/admin/auth" to="/admin/auth/login" exact/>
            <Route path="/admin/auth">
                <Auth/>
            </Route>
            <Redirect from="/admin" to="/admin/produtos" exact/>
            <Route path="/admin">
                <Admin/>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;