import React, { useEffect } from 'react';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import FormularioBase from '../../formularioBase';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

import './styles.scss';

type FormState = {
    nome: string;
    preco: string;
    descricao: string;
    imgUrl: string;
}

type ParamsType = {
    idProduto: string;
}

const Formulario = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { idProduto } = useParams<ParamsType>();
    const isEdicao = idProduto !== 'novo';
    const tituloFormulario = isEdicao ? 'Editar Produto' : 'Cadastrar Produto';

    useEffect(() => {
        if(isEdicao) {
            makeRequest({ url: `/produtos/${idProduto}` })
            .then(response => {
                setValue('nome', response.data.nome);
                setValue('preco', response.data.preco);
                setValue('descricao', response.data.descricao);
                setValue('imgUrl', response.data.imgUrl);
            })
        }
    }, [idProduto, isEdicao, setValue]);    

    const onSubmit = (data: FormState) => { 
        makePrivateRequest({ 
                url: isEdicao ? `/produtos/${idProduto}` : '/produtos', 
                method: isEdicao ? 'PUT' : 'POST', 
                data })
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
            <FormularioBase titulo={tituloFormulario}>

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