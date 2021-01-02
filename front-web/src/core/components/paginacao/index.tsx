import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/imagens/arrow.svg'
import { generateList } from 'core/utils/list';
import './styles.scss';

type Props = {
    totalPaginas: number;
    paginaAtiva: number;
    onChange: (item: number) => void;
}

const Paginacao = ({ totalPaginas, paginaAtiva, onChange }: Props) => {
    const itens = generateList(totalPaginas);

    return (
        <div className="container-paginacao">
            <ArrowIcon className="paginacao-anterior"/>

            {itens.map(item => (
                <div
                    key={item} 
                    className={`item-paginacao ${item === paginaAtiva ? 'active' : ''}`}
                    onClick={() => onChange(item)}    
                >
                    { item + 1 }
                </div>
            ))}

            <ArrowIcon className="paginacao-proximo"/>
        </div>
        
    );
}

export default Paginacao;