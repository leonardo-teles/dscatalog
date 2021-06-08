import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

const Products = () => {
    return (
        <div>
            <Link to="/admin/products" className="mr-5">
                Listar produtos
            </Link>

            <Link to="/admin/products/create" className="mr-5">
                Criar produto
            </Link>

            <Link to="/admin/products/10" className="mr-5">
                Editar produto
            </Link>

            <Switch>
                <Route path="/admin/products" exact>
                    <h3>Exibir a listagem de produtos</h3>
                </Route>

                <Route path="/admin/products/create">
                    <h3>Criar novo produtos</h3>
                </Route>

                <Route path="/admin/products/:productId">
                    <h3>Editar produto</h3>
                </Route>
            </Switch>
        </div>
    );
}

export default Products;