import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Lista from './lista';

import './styles.scss';

const Produtos = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/produtos" exact>
                    <Lista/>
                </Route>
                <Route path="/admin/produtos/novo">
                    <h5>Novo produto</h5>
                </Route>
                <Route path="/admin/produtos/:produtoId">
                    <h5>Editar produto</h5>
                </Route>
            </Switch>
        </div>
    );
}

export default Produtos;