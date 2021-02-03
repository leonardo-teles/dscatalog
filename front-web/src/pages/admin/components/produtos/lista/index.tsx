import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../card';

const Lista = () => {
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/produtos/novo');
    }

    return (
        <div className="admin-lista-produtos">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-lista-container">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default Lista;