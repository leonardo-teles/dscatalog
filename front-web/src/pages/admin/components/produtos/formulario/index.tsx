import React from 'react';
import { makePrivateRequest } from 'core/utils/request';
import FormularioBase from '../../formularioBase';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import './styles.scss';

type FormState = {
    nome: string;
    preco: string;
    descricao: string;
    imgUrl: string;
}

const Formulario = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();
    const history = useHistory();


    const onSubmit = (data: FormState) => { 
        makePrivateRequest({ url: '/produtos', method: 'POST', data })
            .then(() => {
                toast.info('Produto salvo com sucesso');
                history.push('/admin/produtos');
            })
            .catch(() => {
                toast.error('Erro ao salvar produto');
            });        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormularioBase titulo="cadastrar produto">

                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input 
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: {value: 5, message: 'O campo deve ter, no mínimo, 5 caracteres.'},
                                    maxLength: {value: 60, message: 'O campo deve ter, no máximo, 60 caracteres.'}
                                })}
                                name="nome"
                                type="text" 
                                className="form-control input-base"                            
                                placeholder="Nome do prduto"
                            />
                            {errors.nome && (
                                <div className="invalid-feedback d-block">
                                    {errors.nome.message}    
                                </div>                    
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input 
                                ref={register({required: "Campo obrigatório"})}
                                name="preco"
                                type="number" 
                                className="form-control input-base"
                                placeholder="Preço"
                            />
                            {errors.preco && (
                                <div className="invalid-feedback d-block">
                                    {errors.preco.message}    
                                </div>                    
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input 
                                ref={register({required: "Campo obrigatório"})}
                                name="imgUrl"
                                type="text" 
                                className="form-control input-base"
                                placeholder="Imagem do prduto"
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}    
                                </div>                    
                            )}
                        </div>
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
                        {errors.descricao && (
                            <div className="invalid-feedback d-block">
                                {errors.descricao.message}    
                            </div>                    
                        )}
                    </div>
                </div>
            </FormularioBase>
        </form>
    )
}

export default Formulario;