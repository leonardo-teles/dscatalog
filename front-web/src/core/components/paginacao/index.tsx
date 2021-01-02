import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/imagens/arrow.svg'
import './styles.scss';


const Paginacao = () => {
    return (
        <div className="container-paginacao">
            <ArrowIcon className="paginacao-anterior"/>
            <div className="item-paginacao active">
                1
            </div>
            <div className="item-paginacao">
                2
            </div>
            <div className="item-paginacao">
                3
            </div>
            <ArrowIcon className="paginacao-proximo"/>
        </div>
        
    );
}

export default Paginacao;