import React, { useState } from 'react';
import FormularioBase from '../../formularioBase';

import './styles.scss';

type FormState = {
    nome: string;
    preco: string;
    categoria: string;
}

const Formulario = () => {

    const [formData, setFormData] = useState<FormState>({
        nome: '',
        preco: '',
        categoria: ''
    });
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormularioBase titulo="cadastrar produto">

                <div className="row">
                    <div className="col-6">
                        <input 
                            value={formData.nome}
                            name="nome"
                            type="text" 
                            className="form-control mb-3"
                            onChange={handleOnChange}
                            placeholder="Nome do prduto"
                        />

                        <select 
                            value={formData.categoria}
                            name="categoria"
                            className="form-control mb-3" 
                            onChange={handleOnChange}
                        >
                            <option value="computador">Computador</option>
                            <option value="livro">Livro</option>
                            <option value="eletronico">Eletrônicos</option>
                        </select>                    

                        <input 
                            value={formData.preco}
                            name="preco"
                            type="text" 
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                </div>
            </FormularioBase>
        </form>
    )
}

export default Formulario;