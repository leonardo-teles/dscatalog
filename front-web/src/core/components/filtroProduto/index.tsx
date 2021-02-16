import React, { useEffect, useState } from 'react';
import {ReactComponent as IconeBusca} from 'core/assets/imagens/busca.svg';
import Select from 'react-select';
import { makeRequest } from 'core/utils/request';
import { Categoria } from 'core/types/Produto';

import './styles.scss';

export type FormFiltro = {
    nome?: string;
    idCategoria?: number;
}

type Props = {
    onSearch: (filtro: FormFiltro) => void;
}

const FiltroProduto = ({ onSearch }: Props) => {

    const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState<Categoria>();

    useEffect(() => {
        setIsLoadingCategorias(true);
        makeRequest({ url: '/categorias' })
            .then(response => setCategorias(response.data.content))
            .finally(() => setIsLoadingCategorias(false));
    }, []);

    const handleChangeName = (nome: string) => {
        setNome(nome);

        onSearch({ nome, idCategoria: categoria?.id })
    }

    const handleChangeCategoria = (categoria: Categoria) => {
        setCategoria(categoria);

        onSearch({ nome, idCategoria: categoria?.id })
    }

    const limparFiltros = () => {
        setCategoria(undefined);
        setNome('');

        onSearch({ nome: '', idCategoria: undefined })
    }

    return (
        <div className="card-base filtro-produto-container">
            <div className="input-pesquisa">
                <input 
                    type="text" 
                    value={nome}
                    className="form-control" 
                    placeholder="Pesquisar Produto" 
                    onChange={event => handleChangeName(event.target.value)}
                />
                <IconeBusca />
            </div>
            <Select
                name="categorias"
                key={`select-${categoria?.id}`}
                isLoading={isLoadingCategorias}
                options={categorias}
                value={categoria}
                getOptionLabel={(option: Categoria) => option.nome}
                getOptionValue={(option: Categoria) => String(option.id)}
                className="select-container"
                classNamePrefix="select-categorias"
                placeholder="Categorias"
                onChange={value => handleChangeCategoria(value as Categoria)}
                isClearable
            />
            <button 
                className="btn btn-outline-secondary border-radius-10"
                onClick={limparFiltros}
            >
                <strong>LIMPAR FILTRO</strong>
            </button>

        </div>
    )
}

export default FiltroProduto;