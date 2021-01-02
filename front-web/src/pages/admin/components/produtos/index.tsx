import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './styles.scss';

const Produtos = () => {
    return (
        <div>
            <Link to="/admin/produtos" className="mr-5">
                Listar produtos
            </Link>
            <Link to="/admin/produtos/novo" className="mr-5">
                Novo produto
            </Link>
            <Link to="/admin/produtos/10" className="mr-5">
                Editar produto
            </Link>
            <Switch>
                <Route path="/admin/produtos" exact>
                    <h5>Exibir a listagem de produtos</h5>
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