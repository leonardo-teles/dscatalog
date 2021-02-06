import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Formulario from './formulario';
import Lista from './lista';

import './styles.scss';

const Produtos = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/produtos" exact>
                    <Lista/>
                </Route>
                <Route path="/admin/produtos/:idProduto">
                    <Formulario />
                </Route>
            </Switch>
        </div>
    );
}

export default Produtos;