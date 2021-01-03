import React from 'react';
import FormularioBase from '../../formularioBase';

import './styles.scss';

const Formulario = () => {
    return (
        <FormularioBase titulo="CADASTRAR PRODUTO">
            <div className="row">
                <div className="col-6">
                    <input type="text" className="form-control"/>
                </div>
            </div>
        </FormularioBase>
    )
}

export default Formulario;