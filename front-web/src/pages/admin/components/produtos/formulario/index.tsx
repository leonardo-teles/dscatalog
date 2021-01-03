import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import FormularioBase from '../../formularioBase';

import './styles.scss';

type FormState = {
    nome: string;
    preco: string;
    categoria: string;
    descricao: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Formulario = () => {

    const [formData, setFormData] = useState<FormState>({
        nome: '',
        preco: '',
        categoria: '1',
        descricao: ''
    });
    
    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://cdn.awsli.com.br/1000x1000/1610/1610163/produto/61829127/xbox-one-fat-skin-fibra-de-carbono-preto-e1a8c126.jpg',
            categorias: [{ id: formData.categoria }]
        }
        
        makeRequest({ url: '/produtos', method: 'POST', data: payload })
            .then(() => {
                setFormData({ nome: '', categoria: '', preco: '', descricao: '' });
        });
        
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
                            <option value="3">Computadores</option>
                            <option value="1">Livros</option>
                            <option value="2">Eletrônicos</option>
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
                    <div className="col-6">
                        <textarea 
                            value={formData.descricao}
                            name="descricao" 
                            onChange={handleOnChange}
                            className="form-control"
                            cols={30} 
                            rows={10}>                                
                        </textarea>
                    </div>
                </div>
            </FormularioBase>
        </form>
    )
}

export default Formulario;