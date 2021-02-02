import React from 'react';
import { makePrivateRequest } from 'core/utils/request';
import FormularioBase from '../../formularioBase';
import { useForm } from 'react-hook-form';

import './styles.scss';

type FormState = {
    nome: string;
    preco: string;
    descricao: string;
    imgUrl: string;
}

const Formulario = () => {
    const { register, handleSubmit } = useForm<FormState>();
   
    const onSubmit = (data: FormState) => { 
        makePrivateRequest({ url: '/produtos', method: 'POST', data });        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormularioBase titulo="cadastrar produto">

                <div className="row">
                    <div className="col-6">
                        <input 
                            ref={register({required: "Campo obrigatório"})}
                            name="nome"
                            type="text" 
                            className="form-control margin-bottom-30 input-base"                            
                            placeholder="Nome do prduto"
                        />
                        <input 
                            ref={register({required: "Campo obrigatório"})}
                            name="preco"
                            type="number" 
                            className="form-control margin-bottom-30 input-base"
                            placeholder="Preço"
                        />
                        <input 
                            ref={register({required: "Campo obrigatório"})}
                            name="imgUrl"
                            type="text" 
                            className="form-control margin-bottom-30 input-base"
                            placeholder="Imagem do prduto"
                        />
                    </div>
                    <div className="col-6">
                        <textarea 
                            ref={register({required: "Campo obrigatório"})}
                            name="descricao" 
                            className="form-control input-base"
                            placeholder="Descrição"
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