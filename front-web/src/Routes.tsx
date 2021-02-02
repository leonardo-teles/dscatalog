import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/components/navbar';
import Admin from './pages/admin';
import Catalogo from './pages/catalogo';
import DetalheProduto from './pages/catalogo/components/detalheProduto';
import Home from './pages/home';
import Auth from './pages/auth';
import history from './core/utils/history';

const Routes = () => (
    <Router history={history}>
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
            <Redirect from="/auth" to="/auth/login" exact/>
            <Route path="/auth">
                <Auth/>
            </Route>
            <Redirect from="/admin" to="/admin/produtos" exact/>
            <Route path="/admin">
                <Admin/>
            </Route>
        </Switch>
    </Router>
);

export default Routes;