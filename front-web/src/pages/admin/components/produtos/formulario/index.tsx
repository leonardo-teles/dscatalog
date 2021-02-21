import React, { useEffect, useState } from 'react';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import FormularioBase from '../../formularioBase';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useHistory, useParams } from 'react-router-dom';
import { Categoria } from 'core/types/Produto';
import UploadImagem from '../uploadImagem';
import Descricao from './descricao';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';

import './styles.scss';

export type FormState = {
    nome: string;
    preco: string;
    descricao: EditorState;
    imgUrl: string;
    categorias: Categoria[];
}

type ParamsType = {
    idProduto: string;
}
const Formulario = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { idProduto } = useParams<ParamsType>();
    const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [urlImagem, setUrlImagem] = useState('');
    const [urlImagemProduto, setUrlImagemProduto] = useState('');

    const isEdicao = idProduto !== 'novo';
    const tituloFormulario = isEdicao ? 'Editar Produto' : 'Cadastrar Produto';

    useEffect(() => {
        if(isEdicao) {
            makeRequest({ url: `/produtos/${idProduto}` })
            .then(response => {
                const estadoDoConteudo = stateFromHTML(response.data.descricao);
                const estadoDaDescricao = EditorState.createWithContent(estadoDoConteudo);

                setValue('nome', response.data.nome);
                setValue('preco', response.data.preco);
                setValue('categorias', response.data.categorias);
                
                setUrlImagemProduto(response.data.imgUrl);
                
                setValue('descricao', estadoDaDescricao);

            })
        }
    }, [idProduto, isEdicao, setValue]);    

    useEffect(() => {
        setIsLoadingCategorias(true);
        makeRequest({ url: '/categorias' })
            .then(response => setCategorias(response.data.content))
            .finally(() => setIsLoadingCategorias(false));
    }, []);

    const getDescricaoDoEditor = (editorState: EditorState) => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    } 

    const onSubmit = (data: FormState) => { 
        const payload = {
            ...data,
            descricao: getDescricaoDoEditor(data.descricao),
            imgUrl: urlImagem || urlImagemProduto
        }
        
        makePrivateRequest({ 
            url: isEdicao ? `/produtos/${idProduto}` : '/produtos', 
            method: isEdicao ? 'PUT' : 'POST', 
            data: payload 
        })
        .then(() => {
            toast.info('Produto salvo com sucesso');
            history.push('/admin/produtos');
        })
        .catch(() => {
            toast.error('Erro ao salvar produto');
        });        
    }

    const onUploadSuccess = (imgUrl: string) => {
        setUrlImagem(imgUrl);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormularioBase titulo={tituloFormulario}>

                <div className="container-formulario-produto">
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
                            <Controller
                                as={Select} 
                                name="categorias"
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingCategorias}
                                options={categorias}
                                getOptionLabel={(option: Categoria) => option.nome}
                                getOptionValue={(option: Categoria) => String(option.id)}
                                classNamePrefix="select-categorias"
                                placeholder="Categorias"
                                inputId="categorias"
                                defaultValue=""
                                isMulti
                            />
                            {errors.categorias && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório    
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
                            <UploadImagem 
                                onUploadSuccess={onUploadSuccess}
                                urlImagemProduto={urlImagemProduto}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <Descricao control={control}/>
                        {errors.descricao && (
                            <div className="invalid-feedback d-block">
                                {errors.descricao}    
                            </div>                    
                        )}
                    </div>
                </div>
            </FormularioBase>
        </form>
    )
}

export default Formulario;