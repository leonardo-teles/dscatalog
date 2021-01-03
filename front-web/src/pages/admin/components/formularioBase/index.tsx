import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.scss';

type Props = {
    titulo: string;
    children: React.ReactNode;
}

const FormularioBase = ({ titulo, children }: Props) => {
    const history = useHistory();
    
    const handleCancel = () => {
        history.push('../');
    }

    return (
        <div className="form-base-admin card-base">
            <h1 className="titulo-form-base">
                {titulo}
            </h1>
            {children}
            <div className="botoes-form-base">
                <button 
                    className="btn btn-outline-danger boder-radius-10 mr-3"
                    onClick={handleCancel}
                >
                    CANCELAR
                </button>
                <button className="btn btn-primary boder-radius-10">
                    CADASTRAR
                </button>
            </div>
        </div>
    )
}

export default FormularioBase;